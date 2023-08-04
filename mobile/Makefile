# IMPORTANT :
# Because of incompatibilities between expo and
# monorepos (like with pnpm), this app uses npm

install: ## Install client dependencies
	@echo "Installing dependencies mobile"
	npm install

hard-install: ## Install hard client dependencies
	@echo "Hard installing dependencies mobile"
	rm -rf node_modules
	rm -rf package-lock.json
	make install

start-debug: ## Run mobile app
	npm run start

start-debug-clear: ## Run mobile app
	npm run start:clear

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
