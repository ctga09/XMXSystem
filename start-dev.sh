#!/bin/bash

# XMX System Frontend - Development Server
# This script starts the Next.js development server

echo "🚀 Starting XMX System Frontend..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
else
    echo "📚 Checking for dependency updates..."
    pnpm install --frozen-lockfile 2>/dev/null || pnpm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "   Please create it with:"
    echo "   NEXT_PUBLIC_SUPABASE_URL=your_url"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key"
    echo ""
fi

# Start the development server
echo "✅ Starting Next.js server on http://localhost:3000"
echo "   Press Ctrl+C to stop"
echo "================================"

pnpm dev