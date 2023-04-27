#!/bin/sh
git fetch origin && git reset --hard origin/main && git clean -f -d
./build-start.staging.sh
