#!/bin/bash

rm -fr bin
mkdir -p bin
7z a -tzip ./bin/package.zip \
    manifest.json \
    start.js    \
    armory.js    \
    grail.js    \
    README.md   \
    lib         \
    img         \
    css