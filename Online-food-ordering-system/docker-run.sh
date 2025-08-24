#!/bin/bash

echo "Starting Food Ordering System with Docker..."

# Build and start containers
docker-compose up -d

echo "Waiting for MySQL to initialize..."
sleep 30

echo "Services started successfully!"
echo "Access application at: http://localhost:8080/food-order"
echo ""
echo "To stop services: docker-compose down"
echo "To view logs: docker-compose logs -f"