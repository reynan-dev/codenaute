install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	pnpm install

	cd server && make install
	cd client && make install

hard-install: ## Install hard monorepo dependencies
	rm -rf node_modules
	pnpm install

	cd server && make hard-install
	cd client && make hard-install

client: ## Start client
	cd client && make start

server: ## Start server
	cd server && make start

database: ## Start database
	cd database && make start

database-init: ## Iniyializate database with migrations
	cd server && make migration-run

start: ## Start everyservices
	make database
	make server
	make client

stop: ## Stop everyservices
	cd client && make stop
	cd server && make stop
	cd database && make stop

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
