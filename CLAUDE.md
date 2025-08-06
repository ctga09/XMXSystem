# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XMX Corp Dashboard - A modern business dashboard application built with Next.js 15, featuring real-time sales tracking, affiliate management, and comprehensive analytics. The application is designed for XMX Corp to monitor business performance with an intuitive dark-themed interface.

**Note**: This repository contains only the frontend. The backend API (FastAPI/Python) is maintained in a separate repository: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend).

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

### Backend (FastAPI - Separate Repository)
The backend is maintained in a separate repository: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)

**Production URL**: https://xmx-backend-aquzld6ywq-uc.a.run.app

```bash
# Backend commands (run from backend repository)
source venv/bin/activate           # Activate virtual environment
pip install -r requirements.txt    # Install dependencies
uvicorn app.main:app --reload     # Start development server (port 8000)

# Testing webhook locally
python test_webhook.py            # Send test webhook

# Docker testing (recommended)
./scripts/test-docker-local.sh    # Test with production-like environment

# Deployment (automatic on push to main)
git push origin main              # Triggers automatic deploy to Google Cloud Run
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 15.2.4 with App Router (Deployed on Vercel)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Database**: Supabase (PostgreSQL)
- **Backend API**: FastAPI/Python (Deployed on Google Cloud Run)
- **CI/CD**: GitHub Actions for automatic deployments
- **Container**: Docker with Artifact Registry

### Project Structure

**Frontend Repository** (This repository)
- `/frontend` - Main Next.js application
  - `/app` - App Router pages and layouts
    - `/(dashboard)` - Protected dashboard routes with sidebar navigation
    - `/login` - Authentication page
  - `/components` - Reusable components
    - `/ui` - shadcn/ui components library
  - `/lib` - Utility functions
  - `/public` - Static assets

**Backend Repository** ([XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend))
- FastAPI webhook processor
- Python 3.11 with async support
- Supabase integration for data persistence

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
- Production webhook URL configured: https://xmx-backend-aquzld6ywq-uc.a.run.app/webhook/cartpanda

### Backend API ✅
- FastAPI with Python 3.11
- Separate repository: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- Production URL: https://xmx-backend-aquzld6ywq-uc.a.run.app
- Webhook endpoint: `/webhook/cartpanda`
- Visual logs interface: `/webhooks/logs`
- Health check: `/health`
- Swagger docs: `/docs`
- All webhook bugs fixed (Decimal serialization, transaction_id handling)
- Successfully processing real CartPanda webhooks

### Backend Deployment on Google Cloud Run ✅
- Deployed at: https://xmx-backend-aquzld6ywq-uc.a.run.app
- Automatic CI/CD via GitHub Actions (push to main = deploy)
- Docker containers stored in Artifact Registry
- Auto-scaling from 0 to 100 instances
- Secure HTTPS with automatic SSL certificates
- Production webhook configured in CartPanda

## Development Notes

- Backend is maintained in a separate repository: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- Backend successfully tested with CartPanda webhooks using ngrok
- Frontend is fully integrated with Supabase - dashboard shows real-time data
- Webhook data is saved with `CP_` prefix to identify CartPanda orders
- Authentication is currently UI-only (will be implemented with Supabase Auth)
- Real-time updates are working via Supabase subscriptions
- The project uses the Geist font family for consistent typography
- Dark theme optimized for reduced eye strain during extended use
- Row Level Security (RLS) is enabled with proper policies for service role
- All webhook integration bugs have been resolved and tested

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env.local for local development)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key  # For webhook writes
CARTPANDA_WEBHOOK_SECRET=your_webhook_secret
ENVIRONMENT=development
```

### Google Cloud Run (Production)
Environment variables are configured in Cloud Run and GitHub Secrets:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Service role key (not anon key)
- `CARTPANDA_WEBHOOK_SECRET` - CartPanda API token
- `ENVIRONMENT` - Set to "production"

### Vercel Dashboard
Environment variables must be configured in Vercel dashboard for deployment.

## Current Development Status

### ✅ Completed
1. Supabase database with sales table and RLS policies
2. GitHub repositories configured (frontend and backend separated)
3. Frontend deployed on Vercel with environment variables
4. Frontend integrated with Supabase - real-time data working
5. Dashboard and sales pages showing live data
6. Backend webhook API developed and tested locally
7. CartPanda webhook integration tested with real data
8. Webhook logging system for debugging
9. Adapted models for CartPanda's specific payload format
10. Fixed all webhook bugs (Decimal serialization, transaction_id handling)
11. Backend repository created: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
12. Backend deployed on Google Cloud Run with automatic CI/CD
13. Production webhook URL configured in CartPanda
14. Docker containerization with Artifact Registry
15. GitHub Actions workflow for automatic deployments

### ⏳ Next Steps
1. Implement Supabase Auth for user authentication
2. Create affiliate management features with real data
3. Add advanced analytics and reporting
4. Implement data export functionality
5. Add webhook retry mechanism for failed requests