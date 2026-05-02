#!/bin/bash
echo "========================================"
echo "  LUXE E-Commerce - Starting App"
echo "========================================"

echo ""
echo "[1/2] Starting Spring Boot Backend..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

echo "Waiting 20 seconds for backend to start..."
sleep 20

echo ""
echo "[2/2] Starting React Frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo " Open: http://localhost:5173"
echo " Admin: http://localhost:5173/admin"
echo "========================================"
echo "Press CTRL+C to stop both servers"

wait $BACKEND_PID $FRONTEND_PID
