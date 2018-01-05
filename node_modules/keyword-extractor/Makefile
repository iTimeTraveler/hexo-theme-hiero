MOCHA_OPTS = --require should
REPORTER = spec

test:
	@./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS)

.PHONY: test