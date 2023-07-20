CONTAINER_NAME = mobile-dev-codenaute

# If the first argument is "run"...
ifeq (exec,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

install: ## Install client dependencies
	@echo "Installing dependencies server"
	pnpm install

hard-install: ## Install hard client dependencies
	@echo "Hard installing dependencies client"
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	make install

start-debug: ## Run mobile app
	pnpm start

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'
