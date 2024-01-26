#!/bin/bash
rm -rf front/public/components/tmpl
mkdir front/public/components/tmpl
watched_dir="front/public/components/"
templated_dir="front/public/components/tmpl/"
for dir in  "$watched_dir"*;
do
  for template in "$dir"/*;
  do
    if [[ "$template" = *\.html ]];
    then
      templated=$(basename "${template%.html}").tmpl.js
      handlebars "$template" -f "$templated_dir$templated"
    fi
  done
done