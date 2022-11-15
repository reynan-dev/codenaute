install: ## Install monorepo dependencies
	@echo "Initializating monorepo"
	pnpm install

	# TODO: @echo "Initializating database"
	# TODO: cd database && make start
	@echo "Installing dependencies server"
	cd server && make install

	@echo "Installing dependencies client"
	cd client && make instal

hard-install: ## Install hard monorepo dependencies
	rm -rf node_modules
	pnpm start
	# TODO: Implement Hard Install


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

.PHONY: install
.PHONY: hard-install
.PHONY: client
.PHONY: server
.PHONY: database
.PHONY: start
