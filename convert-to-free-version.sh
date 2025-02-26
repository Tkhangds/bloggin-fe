#!/bin/bash

# This script is used to convert the pro version to the free version
# It will remove the pro version from the package.json and package-lock.json
# and replace files that are using the extension

if [ -z "$(command -v jq)" ]; then
  echo "jq is not installed. Please install jq before running this script."
  echo "You can install jq by running 'brew install jq' on macOS or 'sudo apt-get install jq' on Ubuntu."
  exit 1
fi

function replace-jq() {
  jq "$1" "$2" >$2.tmp && mv $2.tmp $2
}

replace-jq 'del(.dependencies."@tiptap-pro/extension-ai")' ./package.json
replace-jq 'del(.packages."node_modules/@tiptap-pro/extension-ai")' ./package-lock.json

cp ./src/extensions/Ai/AiFree.ts ./src/extensions/Ai/index.ts
cp ./src/extensions/AiImage/AiImageFree.ts ./src/extensions/AiImage/index.ts
cp ./src/extensions/AiWriter/AiWriterFree.ts ./src/extensions/AiWriter/index.ts
