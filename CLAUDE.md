# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XMX Corp Dashboard - A modern business dashboard application built with Next.js 15, featuring real-time sales tracking, affiliate management, and comprehensive analytics. The application is designed for XMX Corp to monitor business performance with an intuitive dark-themed interface.

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

### Project Structure
- `/frontend` - Main Next.js application
  - `/app` - App Router pages and layouts
    - `/(dashboard)` - Protected dashboard routes with sidebar navigation
    - `/login` - Authentication page
  - `/components` - Reusable components
    - `/ui` - shadcn/ui components library
  - `/lib` - Utility functions
  - `/public` - Static assets

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

## Planned Integrations

### Supabase Integration
- Database and authentication backend
- Real-time data synchronization
- Row Level Security (RLS) for data protection
- MCP (Model Context Protocol) integration for AI-assisted development

### GitHub Integration
- Version control and collaboration
- GitHub Actions for CI/CD
- MCP integration for repository management

### Vercel Deployment
- Production hosting
- Edge Functions support
- Environment variables management
- Automatic deployments from GitHub

## Development Notes

- The backend directory exists but is currently empty (will house Supabase Edge Functions)
- Authentication is currently UI-only (will be implemented with Supabase Auth)
- All data shown in the dashboard is static/mock data (will be replaced with Supabase queries)
- The project uses the Geist font family for consistent typography
- Dark theme optimized for reduced eye strain during extended use

## Current Development Focus

1. Setting up Supabase MCP for database integration
2. Configuring GitHub MCP for improved development workflow
3. Preparing Vercel deployment configuration
4. Implementing real authentication flow
5. Creating database schema for sales and affiliate data