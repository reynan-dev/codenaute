start-quiet: ## Starting database (detached)
	@echo "Initializating database - Docker compose v1"
	NODE_ENV=development COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose-up -d --build database-dev adminer redis database-test || true
	@echo "Initializating database - Docker compose v2"
	NODE_ENV=development COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose up -d --build database-dev adminer redis database-test

start-debug: ## Starting database in debug mode
	@echo "Initializating database in debug mode - Docker compose v1"
	NODE_ENV=development COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build database-dev adminer redis database-test || true
	@echo "Initializating database in debug mode - Docker compose v2"
	NODE_ENV=development COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker compose up --build database-dev adminer redis database-test

stop: ## Stoping database
	@echo "Stoping database - Docker compose v1"
	docker-compose stop database-dev adminer redis database-test || true
	@echo "Stoping database - Docker compose v2"
	docker compose stop database-dev adminer redis database-test

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

