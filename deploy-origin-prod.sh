#!/bin/sh
git fetch origin && git reset --hard origin/production && git clean -f -d
./build-start.prod.sh
