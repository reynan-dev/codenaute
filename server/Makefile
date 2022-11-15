install: ## Install server dependencies
	# TODO: Implement Install

hard-install: ## Install hard server dependencies
	rm -rf node_modules
	pnpm install --force

start: ## Run server
	pnpm start

watch: ## Run server in watch mode
    node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
	# TODO: config watch


test: ## Run server tests
	# TODO: config tests

pretier: ## Run prettier
    # TODO: config prettier

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
