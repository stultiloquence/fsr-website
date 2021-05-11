#!/bin/sh
set -eu

if [ ! -d "./node" ]; then
  echo "./node directory does not exist. You might want to run ./install.sh first."
  exit 1
fi

export PATH=$(realpath ./node/bin/):$PATH
export NPM_CONFIG_PREFIX=$(realpath ./node/)

./node_modules/.bin/wintersmith build