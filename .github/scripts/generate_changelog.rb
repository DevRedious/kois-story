#!/usr/bin/env ruby
# frozen_string_literal: true

require_relative "changelog_lib"

ref = ARGV.fetch(0, "HEAD")
File.write("CHANGELOG.md", Changelog.render(Changelog.entries(ref)), encoding: "UTF-8")
