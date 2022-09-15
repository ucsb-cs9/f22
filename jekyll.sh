#!/usr/bin/env bash


[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"
rvm use 2.5.3
bundle exec jekyll serve $@
