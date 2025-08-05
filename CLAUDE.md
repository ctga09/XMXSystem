# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XMX Corp Dashboard - A Next.js-based business dashboard application with sales tracking and affiliate management features.

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

## Development Notes

- The backend directory exists but is currently empty
- Authentication is currently UI-only (no actual auth logic implemented)
- All data shown in the dashboard is static/mock data
- The project uses the Geist font family for consistent typography