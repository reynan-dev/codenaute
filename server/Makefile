install: ## Installing server dependencies
	@echo "Installing server dependencies"
	pnpm install

hard-install: ## Installing hard server dependencies
	@echo "Hard installing dependencies server"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

build: ## Compiling typescript
	@echo "Building typescript on server"
	pnpm build

start-debug: ## Starting server in debug mode
	@echo "Starting server in debug mode"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build server

start-quiet: ## Starting server in mode quiet
	@echo "Starting server in quiet mode"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build server

stop: ## Stoping server
	@echo "Stoping server"
	docker-compose stop server

test: ## Runing tests on server
	@echo "Testing server"
	pnpm jest

prettier: ## Starting checking with prettier
	@echo "Checking with prettier"
	npx prettier --check .

prettier-fix: ## Fixing with prettier
	@echo "Fixing with prettier"
	npx prettier --write .

migration-run: ## Runing migrations
	@echo "Executing migrations in mysql-coder database"
	cd .. && docker-compose -f docker-compose.yml exec server pnpm migration:run

migration-generate: ## Generating migrations
	@echo "Generate a new migration"
	cd .. && docker-compose -f docker-compose.yml exec server pnpm migration:generate

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

