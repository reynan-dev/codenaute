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

start: ## Run server
	@echo "Starting server"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build server

stop: ## Run server
	@echo "Starting server"
	docker-compose stop server

test: ## Run server tests
	@echo "Testing server"
	pnpm jest

prettier: ## Run prettier
	@echo "Checking with prettier"
	npx prettier --check $(TS_FILES)

prettier-fix: ## Run prettier
	@echo "Fixing with prettier"
	npx prettier --write $(TS_FILES)

migration-run:
	@echo "Executing migrations in mysql-coder database"
	pnpm migration:run

migration-generate:
	@echo "Generate a new migration"
	pnpm migration:generate

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

