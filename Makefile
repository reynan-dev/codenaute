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

start-client: ## Start client
	cd client && make start-debug

start-server: ## Start server
	cd server && make start-debug

start-database: ## Start database
	cd database && make start-debug

init-database: ## Inizializate database with migrations
	cd server && make migration-run

start-all: ## Start everyservices in silence mode.
	cd database && make start-silence
	cd server && make start-silence
	cd client && make start-silence

stop-all: ## Stop everyservices
	cd client && make stop
	cd server && make stop
	cd database && make stop

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
