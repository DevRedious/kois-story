#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "json"
require "net/http"
require "time"
require "uri"
require_relative "changelog_lib"

WEBHOOK_URL = ENV["DISCORD_WEBHOOK_URL"]
REPOSITORY = ENV["GITHUB_REPOSITORY"] || ENV["CHANGELOG_REPOSITORY"] || "DevRedious/kois-story"
SERVER_URL = ENV["GITHUB_SERVER_URL"] || "https://github.com"
MAX_FIELD_LENGTH = 1024

def target_date
  value = ENV["CHANGELOG_DIGEST_DATE"].to_s.strip
  return value unless value.empty?

  (Date.today - 1).to_s
end

def split_lines(lines)
  chunks = []
  current = +""
  lines.each do |line|
    candidate = current.empty? ? line : "#{current}\n#{line}"
    if candidate.length > MAX_FIELD_LENGTH
      chunks << current unless current.empty?
      current = line
    else
      current = candidate
    end
  end
  chunks << current unless current.empty?
  chunks
end

def fields_for(day_entries)
  fields = []
  Changelog::CATEGORY_ORDER.each do |category|
    entries = day_entries[category]
    next if entries.empty?

    lines = entries.map { |entry| "- #{entry[:label]} — #{entry[:author]} (`#{entry[:sha]}`)" }
    split_lines(lines).each_with_index do |value, index|
      name = index.zero? ? category : "#{category} (suite #{index + 1})"
      fields << { name: name, value: value, inline: false }
    end
  end
  fields
end

def post_discord(payload)
  uri = URI.parse(WEBHOOK_URL)
  request = Net::HTTP::Post.new(uri)
  request["Content-Type"] = "application/json"
  request.body = JSON.generate(payload)
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
    http.request(request)
  end
  abort "Discord webhook failed: #{response.code} #{response.body}" unless response.is_a?(Net::HTTPSuccess)
end

abort "DISCORD_WEBHOOK_URL is missing" if WEBHOOK_URL.to_s.empty?

ref = ARGV.fetch(0, "DEV")
date = target_date
entries = Changelog.entries(ref)
day_entries = entries[date]

if day_entries.values.all?(&:empty?)
  puts "No changelog entries for #{date}; Discord digest skipped."
  exit 0
end

commit_count = day_entries.values.sum(&:length)
payload = {
  username: "kois-story-changelog",
  content: "Changelog DEV du #{date}",
  allowed_mentions: { parse: [] },
  embeds: [{
    title: "Koi's Story — changelog du #{date}",
    description: "#{commit_count} changement#{commit_count > 1 ? 's' : ''} merge sur `DEV` hier.",
    url: "#{SERVER_URL}/#{REPOSITORY}/commits/DEV",
    color: 13_938_487,
    fields: fields_for(day_entries),
    footer: { text: "Digest automatique quotidien — Europe/Paris" },
    timestamp: Time.now.utc.iso8601
  }]
}

if ENV["CHANGELOG_DRY_RUN"] == "true"
  puts JSON.pretty_generate(payload)
  exit 0
end

post_discord(payload)
puts "Discord changelog digest sent for #{date}."
