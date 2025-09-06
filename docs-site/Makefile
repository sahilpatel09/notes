.PHONY: help up down build clean logs shell

help: ## Show this help message
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

up: ## Start the docs-site documentation site in development mode
	docker-compose up -d

down: ## Stop and remove the docs-site container
	docker-compose down

build: ## Build the docs-site container
	docker-compose build

clean: ## Remove containers and images
	docker-compose down --rmi all --volumes --remove-orphans

logs: ## Show container logs
	docker-compose logs -f

shell: ## Open shell in running container
	docker-compose exec docs-site sh


default: help
