#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "net/http"
require "open3"
require "pathname"
require "uri"

ROOT = Pathname.new(__dir__).join("..").expand_path
PUBLIC_URL = "http://127.0.0.1:3000"
ADMIN_URL = "http://127.0.0.1:3001"
HTTP_TIMEOUT = 60
BIN_LF_FILES = %w[bin/rails bin/rake bin/setup bin/dev].freeze

def say(message)
  puts message
end

def fail!(message)
  warn "\nFAIL: #{message}"
  exit 1
end

def run!(*cmd)
  say "\n$ #{cmd.join(" ")}"
  stdout, stderr, status = Open3.capture3(*cmd, chdir: ROOT.to_s)
  puts stdout unless stdout.empty?
  warn stderr unless stderr.empty?
  fail!("command failed: #{cmd.join(" ")}") unless status.success?
  stdout
end

def check(label)
  print "- #{label}... "
  yield
  puts "OK"
rescue StandardError => e
  puts "FAIL"
  fail!("#{label}: #{e.message}")
end

def http_status(base_url, path)
  uri = URI.join(base_url, path)
  response = Net::HTTP.start(uri.host, uri.port, open_timeout: 2, read_timeout: 5) do |http|
    request = Net::HTTP::Get.new(uri)
    http.request(request)
  end
  response.code.to_i
end

def wait_for_status(base_url, path, expected)
  deadline = Time.now + HTTP_TIMEOUT
  last_status = nil
  last_error = nil

  until Time.now > deadline
    begin
      last_status = http_status(base_url, path)
      return last_status if expected.include?(last_status)
    rescue StandardError => e
      last_error = e
    end
    sleep 2
  end

  detail = last_status ? "got #{last_status}" : last_error&.message
  raise "#{base_url}#{path} expected #{expected.join("/")} (#{detail})"
end

def check_route(name, base_url, path, expected)
  check("#{name} #{path} => #{expected.join("/")}") do
    wait_for_status(base_url, path, expected)
  end
end

def rails_snapshot(service)
  code = <<~RUBY.gsub(/\s+/, " ").strip
    require "json";
    models = %w[User Koi Image Message Product Order Payment ClientProfile Tag KoiTag OrderItem];
    counts = models.to_h { |name| [name, name.constantize.count] };
    config = ActiveRecord::Base.connection_db_config;
    puts JSON.generate({
      role: ENV.fetch("KOIS_APP_ROLE", nil),
      adapter: config.adapter,
      database: config.database,
      counts: counts
    })
  RUBY

  output = run!("docker", "compose", "exec", "-T", service, "bin/rails", "runner", code)
  JSON.parse(output.lines.last)
end

def check_lf_file(path)
  bytes = ROOT.join(path).binread
  raise "#{path} contains CRLF" if bytes.include?("\r\n")
end

Dir.chdir(ROOT) do
  say "== Koi's Story Docker smoke =="

  check("docker compose config") do
    run!("docker", "compose", "config", "--quiet")
  end

  check("docker services up") do
    run!("docker", "compose", "up", "-d", "--wait", "db", "public", "admin")
  end

  ps_output = run!("docker", "compose", "ps")
  check("expected services listed") do
    %w[db public admin].each do |service|
      raise "missing #{service} in docker compose ps" unless ps_output.include?(service)
    end
  end

  say "\n== HTTP routes =="
  check_route("public", PUBLIC_URL, "/", [ 200 ])
  check_route("public", PUBLIC_URL, "/kois", [ 200 ])
  check_route("public", PUBLIC_URL, "/up", [ 200 ])
  check_route("public", PUBLIC_URL, "/admin", [ 404 ])
  check_route("admin", ADMIN_URL, "/", [ 200, 302 ])
  check_route("admin", ADMIN_URL, "/admin", [ 200, 302 ])
  check_route("admin", ADMIN_URL, "/users/sign_in", [ 200 ])
  check_route("admin", ADMIN_URL, "/up", [ 200 ])
  check_route("admin", ADMIN_URL, "/kois", [ 404 ])

  say "\n== Rails runners =="
  public_db = rails_snapshot("public")
  admin_db = rails_snapshot("admin")

  check("public runner role") { raise public_db.inspect unless public_db["role"] == "public" }
  check("admin runner role") { raise admin_db.inspect unless admin_db["role"] == "admin" }
  check("shared database") do
    raise "#{public_db["database"]} != #{admin_db["database"]}" unless public_db["database"] == admin_db["database"]
  end
  check("shared counts") do
    raise "counts differ" unless public_db["counts"] == admin_db["counts"]
  end
  check("minimal seed counts") do
    raise "User < 1" unless public_db.dig("counts", "User").to_i >= 1
    raise "Koi < 1" unless public_db.dig("counts", "Koi").to_i >= 1
  end
  say "Counts: #{public_db["counts"].map { |name, count| "#{name}=#{count}" }.join(", ")}"
  say "DB: #{public_db["adapter"]} #{public_db["database"]}"

  say "\n== Line endings =="
  BIN_LF_FILES.each do |path|
    check("#{path} uses LF") { check_lf_file(path) }
  end

  say "\nPASS: Docker smoke checks completed."
end
