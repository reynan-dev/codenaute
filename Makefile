install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	pnpm install

	@echo "Initializating database"
	cd database && make start

	@echo "Installing dependencies server"
	cd server && make install

	@echo "Installing dependencies client"
	cd client && make install

hard-install: ## Install hard monorepo dependencies
	rm -rf node_modules
	pnpm install

	@echo "Initializating database"
	cd database && make start

	@echo "Installing dependencies server"
	cd server && make hard-install

	@echo "Installing dependencies client"
	cd client && make hard-install


client: ## Run client
	cd client && make start

server: ## Run server
	cd server && make start

database: ## Run database
	cd database && make start

start:
	make client
	make server
	make database

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
