#!/bin/bash

echo "Setting up frontend..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create environment file
if [ ! -f .env ]; then
    echo "REACT_APP_API_URL=http://localhost:3001" > .env
    echo "Created .env file"
fi

echo "Frontend setup completed!"
echo "Run 'npm start' to start the development server"