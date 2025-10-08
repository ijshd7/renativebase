PROJECT_NAME=renativebase
COMPOSE=docker-compose --env-file .env

.PHONY: build up down logs clean

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down -v --remove-orphans
	docker system prune -f

reset-db:
	$(COMPOSE) down
	docker volume rm ${PROJECT_NAME}_db_data || true
	$(COMPOSE) up --build