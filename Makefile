install: ## Install dependencies
	@echo "Installing depenenencies...";
	@yarn install --frozen-lockfile;

up: install ## Brings the app up
	yarn start

wipe: ## Clears all generated files
	@echo "Cleaning up ...";
	@find . -name "*error.log" -type f -delete;
	@find . -name "*debug.log" -type f -delete;
	@find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
	@find . -name "@mf-typescript" -type d -prune -exec rm -rf '{}' +
	@find . -name "build" -type d -prune -exec rm -rf '{}' +

clean: wipe ## Installs fresh node_modules without updating the lock file
	@echo "Installing dependencies ...";
	@make install;

refresh: wipe ## Installs fresh node_modules and updates the lock file
	@echo "Installing fresh dependencies ...";
	@yarn install;
	@make schema;
