install: ## Install client dependencies
	@echo "Installing dependencies server"
	# TODO: Implement Install

hard-install: ## Install hard client dependencies
	@echo "Hard installing dependencies client"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

start: ## Run client
	@echo "Starting client"
	# TODO: Implement Start

start-silence: ## Start cliennt in mode silence
	@echo "Starting client in mode silence"
	# TODO: Implement Start

watch: ## Run client in watch mode
	node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
	# TODO: config watch

test: ## Run client tests
	@echo "Testing client"
	# TODO: Implement Test

prettier: ## Run prettier
	@echo "Running prettier"
	# TODO: config prettier

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
.PHONY: pretier
