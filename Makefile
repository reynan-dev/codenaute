install: ## Installing monorepo dependencies
	@echo "Initializating monorepo setup"
	pnpm install
	@echo "Initializating server"
	cd server && make install
	@echo "Initializating client"
	cd client && make install

hard-install: ## Installing hard monorepo dependencies
	@echo "Initializating monorepo setup with hard install"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install
	@echo "Initializating server with hard install"
	cd server && make hard-install
	@echo "Initializating client with hard install"
	cd client && make hard-install

start-client: ## Starting client in debug mode
	@echo "Starting client in debug mode"
	cd client && make start-debug

start-server: ## Starting server in debug mode
	@echo "Starting server in debug mode"
	cd server && make start-debug

start-database: ## Starting database in debug mode
	@echo "Starting database in debug mode"
	cd database && make start-debug

init-database: ## Inizializate database with migrations
	@echo "Inizialize database with migrations"
	cd server && make migration-run

start-all: ## Starting everyservices in quiet mode.
	@echo "Starting every services in quiet mode."
	cd database && make start-quiet
	cd server && make start-quiet
	cd client && make start-quiet

stop-all: ## Stoping everyservices
	@echo "Stoping every services"
	cd client && make stop
	cd server && make stop
	cd database && make stop

prettier: ## Starting checking with prettier
	@echo "Checking with prettier"
	npx prettier --check .

prettier-fix: ## Fixing with prettier
	@echo "Format code with prettier"
	npx prettier --ignore-path .prettierignore --config .prettierrc.json --write .

prettier-check: ## Fixing with prettier
	@echo "Check code with prettier"
	npx prettier --ignore-path .prettierignore --config .prettierrc.json --check .

ci:
	@echo "------- SERVER : CI CHECK"
	cd server && pnpm ci

	@echo "------- CLIENT : CI CHECK"
	cd client && pnpm ci

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
