install: ## Installing monorepo dependencies
	@echo "Initializating monorepo"
	pnpm install

	cd server && make install
	cd client && make install

hard-install: ## Installing hard monorepo dependencies
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

	cd server && make hard-install
	cd client && make hard-install

start-client: ## Starting client in debug mode
	cd client && make start-debug

start-server: ## Starting server in debug mode
	cd server && make start-debug

start-database: ## Starting database in debug mode
	cd database && make start-debug

init-database: ## Inizializate database with migrations
	cd server && make migration-run

start-all: ## Starting everyservices in quiet mode.
	cd database && make start-quiet
	cd server && make start-quiet
	cd client && make start-quiet

stop-all: ## Stoping everyservices
	cd client && make stop
	cd server && make stop
	cd database && make stop

prettier: ## Starting checking with prettier
	@echo "Checking with prettier"
	npx prettier --check .

prettier-fix: ## Fixing with prettier
	@echo "------- ROOT : PRETTIER WRITE"
	npx prettier --ignore-path .prettierignore --config .prettierrc.json --write .

	@echo "------- CLIENT : PRETTIER WRITE"
	npx prettier --ignore-path ./client/.prettierignore --config ./client/.prettierrc.json --write ./client

	@echo "------- SERVER : PRETTIER WRITE"
	npx prettier --ignore-path ./server/.prettierignore --config ./server/.prettierrc.json --write ./server

prettier-check: ## Fixing with prettier
	@echo "------- ROOT : PRETTIER CHECK"
	npx prettier --ignore-path .prettierignore --config .prettierrc.json --check .

	@echo "------- CLIENT : PRETTIER CHECK"
	npx prettier --ignore-path ./client/.prettierignore --config ./client/.prettierrc.json --check ./client

	@echo "------- SERVER : PRETTIER CHECK"
	npx prettier --ignore-path ./server/.prettierignore --config ./server/.prettierrc.json --check ./server

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
