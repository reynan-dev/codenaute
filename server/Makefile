TS_FILES = `(find . -type f -iname "*.ts" -not -path "./node_modules/*")`

install: ## Install server dependencies
	@echo "Installing server dependencies"
	pnpm install

hard-install: ## Install hard server dependencies
	@echo "Hard installing dependencies server"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

build: ## Compile typescript
	@echo "Building server"
	pnpm build

start-debug: ## Start server
	@echo "Starting server"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build server

start-silence: ## Start server in mode silence
	@echo "Starting server in mode silence"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build server

stop: ## Stop server
	@echo "Starting server"
	docker-compose stop server

test: ## Run server tests
	@echo "Testing server"
	pnpm jest

prettier: ## Start checking with prettier
	@echo "Checking with prettier"
	npx prettier --check $(TS_FILES)

prettier-fix: ## Fixing with prettier
	@echo "Fixing with prettier"
	npx prettier --write $(TS_FILES)

migration-run: ## Run migrations
	@echo "Executing migrations in mysql-coder database"
	cd .. && docker-compose -f docker-compose.yml exec server pnpm migration:run

migration-generate: ## Generate migrations
	@echo "Generate a new migration"
	cd .. && docker-compose -f docker-compose.yml exec server pnpm migration:generate

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

