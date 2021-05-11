#!/bin/sh
set -eu

if [ -d "./node" ]; then
  echo "./node directory already exists. If you still want to run this script, delete the node directory and run it again."
  exit 1
fi

curl https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz --output node-v14.16.1-linux-x64.tar.xz
tar xf node-v14.16.1-linux-x64.tar.xz
mv v14.16.1-linux-x64 node
rm v14.16.1-linux-x64.tar.xz

export PATH=$(realpath ./node/bin/):$PATH
export NPM_CONFIG_PREFIX=$(realpath ./node/)

npm install