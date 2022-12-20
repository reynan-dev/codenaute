TS_FILES = find . -type f -iname "*.ts" -not -path "./node_modules/*


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

start-all: ## Starting everyservices in silence mode.
	cd database && make start-silence
	cd server && make start-silent
	cd client && make start-silent

stop-all: ## Stoping everyservices
	cd client && make stop
	cd server && make stop
	cd database && make stop

prettier: ## Starting checking with prettier
	@echo "Checking with prettier"
	npx prettier --check $(TS_FILES)

prettier-fix: ## Fixing with prettier
	@echo "Fixing with prettier"
	find . -type f -iname "*.ts" -not -path "./node_modules/*" -exec npx prettier --write {} +

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
