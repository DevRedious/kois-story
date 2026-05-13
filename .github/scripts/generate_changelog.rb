#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "open3"

REF = ARGV.fetch(0, "HEAD")
REPO = ENV["CHANGELOG_REPOSITORY"] || ENV["GITHUB_REPOSITORY"]

CATEGORY_ORDER = ["Added", "Changed", "Fixed", "Removed", "Integration"].freeze
PREFIX_RE = /^(feat|fix|docs|style|refactor|test|chore|ci|build|perf|revert|add|added)(\([^)]+\))?!?:\s*/i

LOGIN_TO_AUTHOR = {
  "DevRedious" => "Morgan",
  "ValVoy" => "Valentin",
  "ff14eternitalis-debug" => "Romain",
  "github-actions[bot]" => "Automation",
  "app/github-actions" => "Automation",
  "web-flow" => "GitHub"
}.freeze

LOCAL_AUTHOR_TO_AUTHOR = {
  "mverhaeghe5@gmail.com" => "Morgan",
  "188633623+DevRedious@users.noreply.github.com" => "Morgan",
  "v.cheron92@gmail.com" => "Valentin",
  "97049508+ValVoy@users.noreply.github.com" => "Valentin",
  "valentin.cheron@thehackingproject.org" => "Valentin",
  "ff14eternitalis@gmail.com" => "Romain",
  "41898282+github-actions[bot]@users.noreply.github.com" => "Automation",
  "noreply@github.com" => "GitHub"
}.freeze

def run(*command)
  output, status = Open3.capture2e(*command)
  abort output unless status.success?
  output
end

def clean_subject(subject)
  text = subject.to_s.strip.sub(/\s+\[skip ci\]\z/i, "")
  loop do
    next_text = text.sub(PREFIX_RE, "")
    break if next_text == text

    text = next_text.strip
  end

  text
    .sub(/^:bug:\s*/i, "")
    .sub(/\AAdd\b/, "add")
    .sub(/\AAdded\b/, "added")
    .sub(/\AFixed\b/, "fixed")
    .sub(/\AFixing\b/, "fixing")
    .sub(/\AUpdate\b/, "update")
    .sub(/\ARemove\b/, "remove")
    .sub(/\ARemoved\b/, "removed")
    .sub(/\ANew\b/, "new")
    .sub(/\AEnhance\b/, "enhance")
    .sub(/\AReadme\b/, "README")
    .sub(/\.$/, "")
    .strip
end

def merge_title(subject, body)
  return subject unless subject.start_with?("Merge pull request")

  detail = body.to_s.lines.map(&:strip).reject(&:empty?).find { |line| line != subject }
  return subject unless detail

  pr_number = subject[/#\d+/]
  detail = detail.sub(/\s+\[skip ci\]\z/i, "")
  pr_number ? "Merge pull request #{pr_number}: #{detail}" : "#{subject}: #{detail}"
end

def category_for(subject, cleaned)
  stripped = subject.to_s.strip
  normalized = cleaned.to_s.strip
  return "Integration" if stripped.match?(/^Merge\b/i) || stripped.match?(/auto-update CHANGELOG/i)
  return "Added" if stripped.match?(/^(feat|add|added)\b/i) ||
                    normalized.match?(/^(add|added|new|implement|create|base structure|repository initialized|first commit)\b/i)
  return "Fixed" if stripped.match?(/^(fix|fixed|fixing|resolve|repair|relax|revert)\b/i) ||
                    normalized.match?(/^(fix|fixed|fixing|resolve|repair|relax|restore)\b/i)
  return "Removed" if stripped.match?(/^(remove|removed|delete|deleted)\b/i) ||
                      normalized.match?(/^(remove|removed|delete|deleted)\b/i)

  "Changed"
end

def github_repo
  return REPO if REPO && !REPO.empty?

  JSON.parse(run("gh", "repo", "view", "--json", "nameWithOwner"))["nameWithOwner"]
rescue StandardError
  nil
end

def github_metadata(ref_sha)
  repo = github_repo
  return [{}, {}] unless repo

  commits = {}
  1.upto(20) do |page|
    body = run("gh", "api", "repos/#{repo}/commits?sha=#{ref_sha}&per_page=100&page=#{page}")
    batch = JSON.parse(body)
    break if batch.empty?

    batch.each { |commit| commits[commit.fetch("sha")[0, 7]] = commit.dig("author", "login") }
    break if batch.size < 100
  end

  prs = JSON.parse(run("gh", "pr", "list", "--state", "all", "--base", "DEV", "--limit", "300", "--json", "number,author"))
  pr_authors = prs.to_h { |pr| [pr.fetch("number").to_s, pr.dig("author", "login")] }
  [commits, pr_authors]
rescue StandardError => e
  warn "GitHub metadata unavailable, falling back to local Git authors: #{e.message}"
  [{}, {}]
end

ref_sha = run("git", "rev-parse", REF).strip
github_authors, pr_authors = github_metadata(ref_sha)

format = "%H%x1f%h%x1f%ad%x1f%an%x1f%ae%x1f%s%x1f%B%x1e"
records = run("git", "log", "--pretty=format:#{format}", "--date=short", REF).split("\x1e")
entries_by_date = Hash.new { |hash, date| hash[date] = Hash.new { |inner, category| inner[category] = [] } }

records.each do |record|
  full_sha, short_sha, date, author_name, author_email, subject, body = record.strip.split("\x1f", 7)
  next unless short_sha

  display_subject = merge_title(subject, body)
  label = clean_subject(display_subject)
  category = category_for(display_subject, label)
  pr_number = display_subject[/Merge pull request #(\d+)/, 1]
  login = pr_number ? pr_authors[pr_number] : github_authors[short_sha]
  author = if display_subject.match?(/auto-update CHANGELOG/i)
             "Automation"
           else
             LOGIN_TO_AUTHOR[login] || LOCAL_AUTHOR_TO_AUTHOR[author_email] || author_name
           end
  entries_by_date[date][category] << "- #{label} — #{author} (`#{short_sha}`)"
end

output = [
  "# Changelog",
  "",
  "All notable changes to this project are documented in this file.",
  "",
  "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).",
  "This project follows a pre-production workflow until the first production deployment.",
  "Each entry keeps its human author and short commit SHA for traceability.",
  "",
  "---",
  ""
]

entries_by_date.keys.sort.reverse.each do |date|
  output << "## [#{date}]"
  output << ""
  CATEGORY_ORDER.each do |category|
    entries = entries_by_date[date][category]
    next if entries.empty?

    output << "### #{category}"
    output.concat(entries)
    output << ""
  end
  output << "---"
  output << ""
end

File.write("CHANGELOG.md", output.join("\n"), encoding: "UTF-8")
