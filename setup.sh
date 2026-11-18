#!/bin/bash
# Quick setup script for the project

echo "🚀 EasyCook Project Setup"
echo "========================"

# Check if venv exists
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
else
    echo "✓ Virtual environment exists"
fi

echo "🔧 Activating virtual environment..."
source .venv/bin/activate

echo "📥 Installing dependencies..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1
pip install -r requirements.dev.txt > /dev/null 2>&1

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Activate venv: source .venv/bin/activate"
echo "   2. Go to backend:  cd backend"
echo "   3. Run server:     python manage.py runserver"
echo ""
echo "🐳 Or use Docker:"
echo "   docker-compose up"

