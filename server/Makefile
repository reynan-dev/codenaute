install:
    pnpm install

hard-install:
	rm -rf node_modules
	pnpm install --force

start:
	pnpm start

watch:
    node_modules/.bin/chokidar 'test/**/*.js' -c 'node_modules/.bin/tape {path}'
	# TODO: config watch


test:
    NODE_ENV=test \
    LOG_ENABLED=false \
    LOG_LEVEL=silent \
    pnpm test
	# TODO: config tests

.PHONY: install
.PHONY: hard-install
.PHONY: start
.PHONY: watch
.PHONY: test
