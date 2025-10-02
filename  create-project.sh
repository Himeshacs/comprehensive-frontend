#!/bin/bash

echo "Creating Comprehensive System Project..."

# Create project structure
mkdir -p comprehensive-system/{backend,frontend}/{src,public}
mkdir -p comprehensive-system/backend/src/{auth,users,database/seeds}
mkdir -p comprehensive-system/frontend/src/{components,contexts,services}

cd comprehensive-system

# Create root files
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: comprehensive_system
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
      - elasticsearch
    environment:
      - NODE_ENV=development
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:3001
    command: npm start

volumes:
  postgres_data:
  elasticsearch_data:
EOF

cat > README.md << 'EOF'
# Comprehensive System - React + NestJS

## Quick Start
```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down