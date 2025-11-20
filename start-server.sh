#!/bin/bash

# EPhone Browser Server Startup Script

echo "🚀 Starting EPhone Browser Server..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if we're in the right directory
if [ ! -d "www" ]; then
    echo "❌ Error: www directory not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Try different server options
if command_exists node && [ -f "serve-browser.js" ]; then
    echo "🟢 Using Node.js server (serve-browser.js)"
    node serve-browser.js
elif command_exists python3; then
    echo "🟡 Using Python 3 server"
    cd www
    echo "📱 Open your browser to: http://localhost:8000/start-browser.html"
    python3 -m http.server 8000
elif command_exists python; then
    echo "🟡 Using Python 2 server"
    cd www
    echo "📱 Open your browser to: http://localhost:8000/start-browser.html"
    python -m SimpleHTTPServer 8000
elif command_exists php; then
    echo "🟡 Using PHP server"
    cd www
    echo "📱 Open your browser to: http://localhost:8000/start-browser.html"
    php -S localhost:8000
else
    echo "❌ No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • Node.js (recommended)"
    echo "  • Python 3"
    echo "  • PHP"
    echo ""
    echo "Or manually open www/start-browser.html in your browser"
    echo "(Note: Direct file access has limited functionality)"
    exit 1
fi