# AIRPORTMAP APP

# @author komed3 (Paul Köhler)
# @version 2.0.0
# @license MIT

# Load build configuration
include project/build.config.yml

# Environment
NODE_ENV ?= production
TS := $(shell date +%Y%m%d_%H%M%S)

# Instruction set
.PHONY: \
	all clean clean-temp install setup-external setup-modules setup-i18n build \
	compile-server compile-client compile-scss compile-views assets package \
	create-deployment dev dev-build watch deploy help

# Main targets
all: clean install setup-external build package clean-temp

# Clean everything
clean:
	@echo "Cleaning build artifacts ..."
	rm -rf dist/
	rm -rf temp/
	rm -rf src/modules/
	rm -rf locales/
	rm -rf releases/

# Clean temporary files
clean-temp:
	@echo "Cleaning temporary files ..."
	rm -rf temp/
	rm -rf src/modules/
	rm -rf locales/

# Install dependencies
install:
	@echo "Installing dependencies ..."
	npm install

# Setup external dependencies
setup-external: setup-modules setup-i18n

# Setup external modules
setup-modules:
	@echo "Setting up external modules ..."
	@node project/scripts/modules.js

# Setup i18n
setup-i18n:
	@echo "Setting up internationalization ..."
	@node project/scripts/i18n.js

# Build everything
build: compile-server compile-client compile-scss compile-views assets
	@echo "Build completed successfully!"

# Compile server-side TypeScript
compile-server:
	@echo "Compiling server ..."
	@node project/scripts/compile-server.js

# Compile client-side TypeScript
compile-client:
	@echo "Compiling client assets ..."
	@node project/scripts/compile-assets.js client

# Compile SCSS
compile-scss:
	@echo "Compiling SCSS ..."
	@node project/scripts/compile-assets.js scss

# Compile views
compile-views:
	@echo "Processing views ..."
	@node project/scripts/compile-assets.js views

# Copy static files (assets)
assets:
	@echo "Copying static files ..."
	@node project/scripts/compile-assets.js assets

# Create deployment package
package: create-deployment
	@echo "Creating deployment package ..."
	@node project/scripts/create-deployment.js

# Create deployment structure
create-deployment:
	@echo "Preparing deployment ..."
	@mkdir -p dist/config
	@cp src/config/*.yml dist/config/ 2>/dev/null || true
	@cp -r locales dist/ 2>/dev/null || true
	@cp -r src/modules dist/ 2>/dev/null || true

# Development mode
dev:
	@echo "Starting development server ..."
	NODE_ENV=development npm run dev

# Quick development build
dev-build:
	@NODE_ENV=development $(MAKE) setup-external build

# Watch mode for development
watch:
	@echo "Starting watch mode ..."
	@while true; do \
		$(MAKE) dev-build; \
		echo "Watching for changes ... (Ctrl+C to stop)"; \
		sleep 2; \
	done

# Deploy (create tarball)
deploy: all
	@echo "Deployment package ready!"
	@ls -la releases/

# Help
help:
	@echo "Airportmap App v.2.0.0"
	@echo ""
	@echo "Main targets:"
	@echo "  all            - Full build with external dependencies"
	@echo "  build          - Build only (assumes externals are setup)"
	@echo "  dev            - Start development server"
	@echo "  dev-build      - Quick development build"
	@echo "  package        - Create deployment package"
	@echo "  deploy         - Full build and package"
	@echo "  clean          - Clean all build artifacts"
	@echo "  clean-temp     - Clean temporary files"
	@echo ""
	@echo "Setup targets:"
	@echo "  install        - Install npm dependencies"
	@echo "  setup-modules  - Setup external modules"
	@echo "  setup-i18n     - Setup internationalization"
	@echo ""
	@echo "Environment:"
	@echo "  NODE_ENV=$(NODE_ENV)"
