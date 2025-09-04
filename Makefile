# AIRPORTMAP APP

# @author komed3 (Paul Köhler)
# @license MIT

.PHONY: \
	all install setup-external setup-i18n build compile-server

# Main targets
all: install setup-external build

# Install dependencies
install:
	@echo "Installing dependencies ..."
	npm install

# Setup external dependencies
setup-external: setup-i18n

# Setup i18n
setup-i18n:
	@echo "Setting up i18n ..."
	@node project/cli/setupI18n.js

# Build everything
build: compile-server
	@echo "Build completed successfully!"

# Compile server-side TypeScript
compile-server:
	@echo "Compiling server ..."
	@tsc --build project/tsconfig.server.json
	@tsc-alias -p project/tsconfig.server.json
