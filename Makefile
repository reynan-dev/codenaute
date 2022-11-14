MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	@npm start

	@echo "Initializating database"
	cd database && make start
	@echo "Installing dependencies server"
	cd server && make install
	@echo "Installing dependencies client"
	cd client && make install

hard-install:
    rm -rf node_modules
	npm start
	# TODO: Implement Hard Install

client:
	cd client && make start

server:
	cd server && make start

database:
	cd database && make start

.PHONY: install
.PHONY: hard-install
.PHONY: client
.PHONY: server
.PHONY: database
