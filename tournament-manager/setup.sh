#!/bin/bash

# Tournament Manager Setup Script

echo "🎮 Tournament Manager - Setup Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
if [ -f ".env" ]; then
    echo "✓ .env file exists"
else
    cp .env.example .env
    echo "✓ Created .env file - please update with your credentials"
fi
cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your IGDB API credentials"
echo "2. Start MongoDB: mongod"
echo "3. Start Backend: cd backend && npm run dev"
echo "4. Start Frontend: cd frontend && npm start"
echo ""
echo "Frontend will open at http://localhost:3000"
echo "API will run at http://localhost:5000"
