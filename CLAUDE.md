# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XMX Corp Dashboard - A modern business dashboard application built with Next.js 15, featuring real-time sales tracking, affiliate management, and comprehensive analytics. The application is designed for XMX Corp to monitor business performance with an intuitive dark-themed interface.

**Note**: This repository contains only the frontend. The backend API (FastAPI/Python) is maintained separately and not committed to this repository.

## Development Commands

### Frontend (Next.js)
```bash
# Frontend commands (run from frontend/ directory)
cd frontend
pnpm install          # Install dependencies
pnpm run dev          # Start development server (port 3000)
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run linting

# Code Quality Checks
pnpm run lint:check   # Check for linting issues
pnpm run lint:fix     # Auto-fix linting issues
pnpm run type:check   # Check TypeScript types
pnpm run check:all    # Run all checks (types + lint)
```

### Backend (FastAPI)
```bash
# Backend commands (run from backend/ directory)
cd backend
source venv/bin/activate           # Activate virtual environment
pip install -r requirements.txt    # Install dependencies
uvicorn app.main:app --reload     # Start development server (port 8000)

# Testing webhook locally
python test_webhook.py            # Send test webhook

# Using ngrok for external testing
ngrok http 8000                   # Create public URL for webhook testing
# Or use the script: ./start_ngrok.sh
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 15.2.4 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Database**: Supabase (PostgreSQL)
- **Backend API**: FastAPI/Python (maintained separately, not in this repo)

### Project Structure
- `/frontend` - Main Next.js application (committed to GitHub)
  - `/app` - App Router pages and layouts
    - `/(dashboard)` - Protected dashboard routes with sidebar navigation
    - `/login` - Authentication page
  - `/components` - Reusable components
    - `/ui` - shadcn/ui components library
  - `/lib` - Utility functions
  - `/public` - Static assets
- `/backend` - FastAPI webhook API (NOT committed, local development only)

### Key Architectural Patterns

1. **App Router Layout System**: Uses nested layouts for consistent navigation structure. The dashboard layout (`app/(dashboard)/layout.tsx`) provides sidebar navigation for all dashboard pages.

2. **Component Architecture**: Uses shadcn/ui components built on Radix UI for accessibility and customization. All UI components follow a consistent dark theme with purple accent colors.

3. **Route Organization**: 
   - Public routes: `/login`
   - Protected routes: `/`, `/sales`, `/affiliates` (wrapped in dashboard layout)

4. **Styling Approach**: Dark theme with consistent color palette:
   - Background: `#0D0C12`
   - Card/Panel: `#1A1920`
   - Border: `#2A2833`
   - Primary accent: `#5F2EEA`

### Important Configuration

ESLint and TypeScript checks are now enabled. Always run `pnpm run check:all` before committing code to ensure quality standards are met.

## Current Integrations

### Supabase Integration ✅
- Database backend with `sales` table configured
- Real-time data synchronization working
- Row Level Security (RLS) enabled with proper policies
- Service role key configured for webhook operations
- Frontend using anon key for secure client access

### GitHub Integration ✅
- Version control for frontend only
- Backend excluded via .gitignore for security
- Environment variables documented in `.env.example`
- MCP integration configured

### Vercel Deployment ✅
- Frontend deployed at https://xmx-system.vercel.app
- Environment variables configured in Vercel dashboard
- Automatic deployments from GitHub main branch

### CartPanda Webhook Integration ✅
- Webhook endpoint configured and tested with real data
- Adapted to CartPanda's specific payload format
- Successfully receiving and processing order events
- Tested with ngrok for local development

### Backend API (Local Development) ✅
- FastAPI with Python 3.11
- Webhook endpoint: `/webhook/cartpanda`
- Visual logs interface: `/webhooks/logs`
- Health check: `/health`
- Swagger docs: `/docs`

### Backend Deployment (Pending)
- Will be deployed on Google Cloud Run
- Separate from frontend deployment
- Production webhook URL to be configured in CartPanda

## Development Notes

- The backend directory contains a fully functional FastAPI webhook API (NOT committed to GitHub)
- Backend successfully tested with CartPanda webhooks using ngrok
- Frontend is fully integrated with Supabase - dashboard shows real-time data
- Webhook data is saved with `CP_` prefix to identify CartPanda orders
- Authentication is currently UI-only (will be implemented with Supabase Auth)
- Real-time updates are working via Supabase subscriptions
- The project uses the Geist font family for consistent typography
- Dark theme optimized for reduced eye strain during extended use
- Row Level Security (RLS) is enabled with proper policies for service role

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env.local)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key  # For webhook writes
CARTPANDA_WEBHOOK_SECRET=your_webhook_secret
ENVIRONMENT=development
```

### Vercel Dashboard
Environment variables must be configured in Vercel dashboard for deployment.

## Current Development Status

### ✅ Completed
1. Supabase database with sales table and RLS policies
2. GitHub repository configured (frontend only)
3. Frontend deployed on Vercel with environment variables
4. Frontend integrated with Supabase - real-time data working
5. Dashboard and sales pages showing live data
6. Backend webhook API developed and tested locally
7. CartPanda webhook integration tested with real data
8. Webhook logging system for debugging
9. Adapted models for CartPanda's specific payload format

### ⏳ Next Steps
1. Deploy backend on Google Cloud Run
2. Configure production webhook URL in CartPanda
3. Implement Supabase Auth for user authentication
4. Create affiliate management features with real data
5. Add advanced analytics and reporting