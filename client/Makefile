install: ## Install client dependencies
	@echo "Installing dependencies server"
	# TODO: Implement Install

hard-install: ## Install hard client dependencies
	@echo "Hard installing dependencies client"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

start-debug: ## Run client (by default in watch mode)
	@echo "Starting client"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up --build client

start-quiet: ## Start cliennt in mode quiet
	@echo "Starting client in mode quiet"
	COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose up -d --build client

stop: ## Run client
	@echo "Stoping client"
	docker-compose stop client

test: ## Run client tests
	@echo "Testing client with jest"
	pnpm test

prettier: ## Run prettier
	@echo "Running prettier"
	npx prettier --check $(TS_FILES)

prettier-fix: ## Run prettier
	@echo "Running prettier"
	npx prettier --write $(TS_FILES)

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
.PHONY: pretier
