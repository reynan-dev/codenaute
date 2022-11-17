start: ## Starts service (detached)
	@echo "Initializating database"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build postgres adminer redis

debug: ## Start service (debug)
	@echo "Initializating database in debug mode"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build postgres adminer redis

stop: ## Stop service
	@echo "Stoping database"
	docker-compose stop postgres adminer redis

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

