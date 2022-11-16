install: ## Install server dependencies
	@echo "Installing server"
	pnpm install

hard-install: ## Install hard server dependencies
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	pnpm install

build:
	@echo "Building server"
	pnpm build

start: ## Run server
	@echo "Starting server"
	make build && pnpm start

watch: ## Run server in watch mode
	@echo "Starting server in watch mode"
	pnpm start:watch

test: ## Run server tests
	@echo "Testing server"
	pnpm jest

prettier: ## Run prettier
	@echo "Running prettier"
	# TODO: config prettier

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

