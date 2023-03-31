#!/bin/sh
NODE_ENV=production docker compose -f docker-compose.production.yml up --build --detach
