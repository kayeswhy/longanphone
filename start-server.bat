@echo off
REM EPhone Browser Server Startup Script for Windows

echo 🚀 Starting EPhone Browser Server...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REM Check if we're in the right directory
if not exist "www" (
    echo ❌ Error: www directory not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

REM Try Node.js server first
where node >nul 2>nul
if %errorlevel% == 0 (
    if exist "serve-browser.js" (
        echo 🟢 Using Node.js server (serve-browser.js)
        node serve-browser.js
        goto :end
    )
)

REM Try Python 3
where python >nul 2>nul
if %errorlevel% == 0 (
    echo 🟡 Using Python server
    cd www
    echo 📱 Open your browser to: http://localhost:8000/start-browser.html
    python -m http.server 8000
    goto :end
)

REM Try PHP
where php >nul 2>nul
if %errorlevel% == 0 (
    echo 🟡 Using PHP server
    cd www
    echo 📱 Open your browser to: http://localhost:8000/start-browser.html
    php -S localhost:8000
    goto :end
)

REM No server found
echo ❌ No suitable server found!
echo.
echo Please install one of the following:
echo   • Node.js (recommended)
echo   • Python 3
echo   • PHP
echo.
echo Or manually open www/start-browser.html in your browser
echo (Note: Direct file access has limited functionality)
pause
exit /b 1

:end
pause