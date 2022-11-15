MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	@pnpm start

	@echo "Initializating database"
	cd database && make start
	@echo "Installing dependencies server"
	cd server && make install
	@echo "Installing dependencies client"
	cd client && make install

hard-install: ## Install hard monorepo dependencies
    rm -rf node_modules
	pnpm start
	# TODO: Implement Hard Install

client: ## Run client
	cd client && make start

server: ## Run server
	cd server && make start

database: ## Run database
	cd database && make start

.PHONY: install
.PHONY: hard-install
.PHONY: client
.PHONY: server
.PHONY: database
