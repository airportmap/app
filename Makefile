# AIRPORTMAP APP

# @author komed3 (Paul Köhler)
# @license MIT

.PHONY: \
	install setup-external setup-i18n

# Install dependencies
install:
	@echo "Installing dependencies ..."
	npm install

# Setup external dependencies
setup-external: setup-i18n

setup-i18n:
	@echo "Setting up i18n ..."
	@node project/cli/setupI18n.js
