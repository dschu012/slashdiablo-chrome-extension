#!/bin/bash

rm -fr bin
mkdir -p bin
7z a -tzip ./bin/package.zip \
    manifest.json \
    start.js    \
    index.js    \
    README.md   \
    lib         \
    img         \
    css