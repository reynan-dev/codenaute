install: ## Install client dependencies
	@echo "Installing server"
    # TODO: Implement Install

hard-install: ## Install hard client dependencies
	rm -rf node_modules
	pnpm install --force

start: ## Run client
	pnpm start

watch: ## Run client in watch mode
	node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
	# TODO: config watch

test: ## Run client tests
	# TODO: config tests

pretier: ## Run prettier
	@echo "Running prettier"
    # TODO: config prettier

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
.PHONY: pretier
