#!/bin/sh
git fetch origin && git reset --hard origin/rv/ci/start-deploy && git clean -f -d
./build-start.prod.sh
