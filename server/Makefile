CONTAINER_NAME = server-codenaute

# If the first argument is "run"...
ifeq (exec,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

install: ## Installing server dependencies
	@echo "Installing server dependencies"
	pnpm install

hard-install: ## Installing hard server dependencies
	@echo "Hard installing dependencies server"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	make install

build: ## Compiling typescript
	@echo "Building typescript on server"
	pnpm build

start-debug: ## Starting server container in debug mode
	@echo "Starting server in debug mode"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build server

start-quiet: ## Starting server container in mode quiet
	@echo "Starting server in quiet mode"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build server

.PHONY: exec
exec : ## Running server container
	docker exec $(CONTAINER_NAME) $(RUN_ARGS)

stop: ## Stoping server container
	@echo "Stoping server"
	docker-compose stop server

test: ## Runing tests on server
	@echo "Testing server"
	docker exec $(CONTAINER_NAME) -e NODE_ENV=test pnpm test

prettier: ## Starting checking with prettier
	@echo "Checking with prettier"
	npx prettier --check .

prettier-fix: ## Fixing with prettier
	@echo "Fixing with prettier"
	npx prettier --write .

migration-run: ## Runing migrations
	@echo "Executing migrations in mysql-coder database"
	docker exec $(CONTAINER_NAME) pnpm migration:run

migration-generate: ## Generating migrations
	@echo "Generate a new migration"
	docker exec $(CONTAINER_NAME) pnpm migration:generate

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

