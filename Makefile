.PHONY: build test dev-api dev-web docker-up docker-down

build:
	cd frontend && npm run build

test:
	cd frontend && npm test
	cd backend && pytest

dev-api:
	cd backend && python run.py

dev-web:
	cd frontend/dist && python -m http.server 8080

docker-up: build
	docker compose up --build

docker-down:
	docker compose down
