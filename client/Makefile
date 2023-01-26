CONTAINER_NAME = client-codenaute

# If the first argument is "run"...
ifeq (exec,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

install: ## Install client dependencies
	@echo "Installing dependencies server"
	pnpm install

hard-install: ## Install hard client dependencies
	@echo "Hard installing dependencies client"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	make install

start-debug: ## Run client (by default in watch mode)
	@echo "Starting client"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build client

start-quiet: ## Start cliennt in mode quiet
	@echo "Starting client in mode quiet"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build client

.PHONY: exec
exec : ## Running server container
	@echo docker exec $(CONTAINER_NAME) $(RUN_ARGS)

terminal : ## Running server container
	@echo docker exec -it $(CONTAINER_NAME) ash
	docker exec -it $(CONTAINER_NAME) ash

stop: ## Run client
	@echo "Stoping client"
	docker-compose stop client

test: ## Run client tests on client
	@echo "Testing client with jest"
	docker exec $(CONTAINER_NAME) pnpm test

prettier: ## Run prettier
	@echo "Running prettier"
	npx prettier --check .

prettier-fix: ## Run prettier
	@echo "Running prettier"
	npx prettier --write .

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
