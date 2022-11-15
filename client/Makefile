install: ## Install client dependencies
    pnpm install

hard-install: ## Install hard client dependencies
	rm -rf node_modules
	pnpm install --force

start: ## Run client
	pnpm start

watch: ## Run client in watch mode
    node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
    # TODO: config watch

test: ## Run client tests
    NODE_ENV=test \
    LOG_ENABLED=false \
    LOG_LEVEL=silent \
    pnpm test
    # TODO: config tests

pretier: ## Run prettier
    pnpm prettier


.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
.PHONY: pretier
