install: ## Install server dependencies
	@echo "Installing server"
	# TODO: Implement Install

hard-install: ## Install hard server dependencies
	rm -rf node_modules
	pnpm install --force

start: ## Run server
	@echo "Starting server"
	# TODO: Implement Start

watch: ## Run server in watch mode
	node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
	# TODO: config watch

test: ## Run server tests
	@echo "Testing server"
	# TODO: Implement Test

prettier: ## Run prettier
	@echo "Running prettier"
	# TODO: config prettier

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test