install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	pnpm install

	cd database && make start
	cd server && make install
	cd client && make install

hard-install: ## Install hard monorepo dependencies
	rm -rf node_modules
	pnpm install

	cd database && make start
	cd server && make hard-install
	cd client && make hard-install

client: ## Run client
	cd client && make start

server: ## Run server
	cd server && make start

database: ## Run database
	cd database && make start

database-init: ## Iniyializate database with migrations
	cd server && make migration-run

start: ## Run everyservices
	make client
	make server
	make database

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
