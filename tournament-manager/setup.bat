@echo off
REM Tournament Manager Setup Script for Windows

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

echo.
echo 🎮 Tournament Manager - Windows Setup Script
echo ==============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js installed
node --version
echo ✓ npm installed
call npm --version

echo.
echo 📦 Setting up Backend...
pushd "%ROOT_DIR%\backend"
call npm install
if exist .env (
    echo ✓ .env file exists
) else (
    copy .env.example .env
    echo ✓ Created .env file - please update with your credentials
)
popd

echo.
echo 📦 Setting up Frontend...
pushd "%ROOT_DIR%\frontend"
call npm install
popd

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your IGDB API credentials
echo 2. Start MongoDB
echo 3. Start Backend: cd backend ^&^& npm run dev
echo 4. Start Frontend: cd frontend ^&^& npm start
echo.
echo Frontend will open at http://localhost:3000
echo API will run at http://localhost:5000
echo.
pause
