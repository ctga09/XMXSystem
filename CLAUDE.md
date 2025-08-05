# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XMX Corp Dashboard - A modern business dashboard application built with Next.js 15, featuring real-time sales tracking, affiliate management, and comprehensive analytics. The application is designed for XMX Corp to monitor business performance with an intuitive dark-themed interface.

**Note**: This repository contains only the frontend. The backend API (FastAPI/Python) is maintained separately and not committed to this repository.

## Development Commands

```bash
# Frontend commands (run from frontend/ directory)
cd frontend
pnpm install          # Install dependencies
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run linting

# Code Quality Checks
pnpm run lint:check   # Check for linting issues
pnpm run lint:fix     # Auto-fix linting issues
pnpm run type:check   # Check TypeScript types
pnpm run check:all    # Run all checks (types + lint)
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
- Real-time data synchronization ready
- Row Level Security (RLS) enabled
- MCP (Model Context Protocol) configured for AI-assisted development

### GitHub Integration ✅
- Version control for frontend only
- Backend excluded via .gitignore
- MCP integration configured

### Vercel Deployment ✅
- Frontend deployed at https://xmx-system.vercel.app
- Environment variables ready for Supabase connection
- Automatic deployments from GitHub

### Backend Deployment (Future)
- Will be deployed on Google Cloud Run
- Separate repository and deployment pipeline
- FastAPI with Python 3.11

## Development Notes

- The backend directory contains a FastAPI webhook API but is NOT committed to GitHub
- Backend is for local development only and will be deployed separately on Google Cloud Run
- Authentication is currently UI-only (will be implemented with Supabase Auth)
- All data shown in the dashboard is static/mock data (ready to be replaced with Supabase queries)
- The project uses the Geist font family for consistent typography
- Dark theme optimized for reduced eye strain during extended use
- Supabase credentials are configured and ready for frontend integration

## Current Development Focus

1. ✅ Supabase database configured with sales table
2. ✅ GitHub repository configured (frontend only)
3. ✅ Frontend deployed on Vercel
4. 🔄 Integrating frontend with Supabase for real-time data
5. ⏳ Implementing real authentication flow with Supabase Auth
6. ⏳ Backend deployment on Google Cloud Run (future)