@echo off
echo ========================================
echo   LUXE E-Commerce - Starting App
echo ========================================

echo.
echo [1/2] Starting Spring Boot Backend...
start "Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run"

echo Waiting 15 seconds for backend to start...
timeout /t 15 /nobreak

echo.
echo [2/2] Starting React Frontend...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ========================================
echo  App starting! Open: http://localhost:5173
echo  Admin panel:  http://localhost:5173/admin
echo  API:          http://localhost:8080/api
echo  H2 Console:   http://localhost:8080/h2-console
echo ========================================
pause
