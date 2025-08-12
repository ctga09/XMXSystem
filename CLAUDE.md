# CLAUDE.md - XMX System Frontend

This file provides guidance to Claude Code (claude.ai/code) when working with the frontend dashboard code.

## 🚨 IMPORTANT: MCP Tools Available - ALWAYS USE THESE!

### Installed MCP Tools
This project has Model Context Protocol (MCP) tools installed. **YOU MUST ALWAYS USE THESE TOOLS** instead of traditional CLI commands or direct API calls.

#### Available MCPs:
1. **GitHub MCP** (`mcp__github__*`) - For all GitHub operations
2. **Supabase MCP** (`mcp__supabase__*`) - For all database operations

### ⚠️ Critical Rules:
- **ALWAYS** use MCP tools when available
- **NEVER** use git CLI commands when MCP GitHub is available
- **NEVER** install gh CLI or other tools when MCP is available
- **ALWAYS** check if an MCP function exists before using alternatives

### 📊 Quick Reference - Use MCP Instead!

| ❌ DON'T USE THIS | ✅ USE THIS INSTEAD | Description |
|-------------------|---------------------|-------------|
| `git push` | `mcp__github__push_files` | Push files to GitHub |
| `git commit -m` | `mcp__github__create_or_update_file` | Commit changes |
| `gh pr create` | `mcp__github__create_pull_request` | Create pull request |
| `git clone` | `mcp__github__get_file_contents` | Read repo files |

## Project Overview

XMX Corp Dashboard - A modern business dashboard application built with Next.js 15, featuring real-time sales tracking, affiliate management, and comprehensive analytics. The application is designed for XMX Corp to monitor business performance with an intuitive dark-themed interface.

**Production URL**: https://xmx-system.vercel.app

**Backend Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend) (FastAPI webhook processor)

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom dark theme
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Database**: Supabase (client-side queries)
- **Deployment**: Vercel with automatic deployments

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev          # Runs on http://localhost:3000

# Build for production
pnpm run build

# Start production server
pnpm run start

# Code Quality Checks
pnpm run lint:check   # Check for linting issues
pnpm run lint:fix     # Auto-fix linting issues
pnpm run type:check   # Check TypeScript types
pnpm run check:all    # Run all checks (types + lint)
```

## Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Dashboard layout group
│   │   ├── layout.tsx       # Sidebar navigation layout
│   │   ├── page.tsx         # Dashboard home
│   │   ├── sales/           # Sales page
│   │   └── affiliates/      # Affiliates page
│   ├── login/               # Authentication page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── theme-provider.tsx   # Dark theme provider
├── hooks/                    # Custom React hooks
│   ├── use-sales.ts         # Sales data hook
│   └── use-dashboard-metrics.ts
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── utils.ts             # Utility functions
└── public/                   # Static assets
```

## Key Features

### Dashboard Pages
- **Home** (`/`) - Overview metrics and charts
- **Sales** (`/sales`) - Detailed sales tracking with filters
- **Affiliates** (`/affiliates`) - Affiliate performance analytics

### UI Components (shadcn/ui)
All components are built on Radix UI for accessibility:
- `Card` - Container components
- `Table` - Data display
- `Button` - Interactive elements
- `Select` - Dropdowns
- `DatePicker` - Date selection
- `Sidebar` - Navigation

### Dark Theme
Consistent color palette throughout:
- **Background**: `#0D0C12`
- **Card/Panel**: `#1A1920`
- **Border**: `#2A2833`
- **Primary Accent**: `#5F2EEA` (Purple)
- **Text**: White/Gray scale

## Environment Variables

Create `.env.local` for local development:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key  # Anon key for client

# Backend API (optional for direct calls)
NEXT_PUBLIC_API_URL=https://xmx-backend-aquzld6ywq-uc.a.run.app
```

**Production**: Environment variables are configured in Vercel Dashboard.

## Data Flow

```
Supabase ← Backend API ← CartPanda Webhooks
    ↓
Frontend (Real-time subscriptions)
```

1. CartPanda sends webhooks to backend
2. Backend processes and stores in Supabase
3. Frontend subscribes to real-time updates
4. Dashboard updates automatically

## API Integration

### Backend Endpoints
The frontend primarily uses Supabase for data, but can also call:
- `GET /status` - System health metrics
- `GET /webhooks/logs` - Webhook history

### Supabase Queries
```typescript
// Example: Fetch recent sales
const { data, error } = await supabase
  .from('sales')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10);
```

## Deployment

### Automatic Deployment (Vercel)
```bash
# Simply push to main branch
git push origin main
# Vercel automatically builds and deploys
```

### Manual Deployment
```bash
# Build locally
pnpm run build

# Deploy to Vercel
vercel --prod
```

## Component Patterns

### Layout System
Uses Next.js App Router nested layouts:
```tsx
// (dashboard)/layout.tsx provides sidebar
// All dashboard pages inherit this layout
```

### Data Fetching
```tsx
// Server Component (default)
async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Component (interactive)
'use client';
function InteractiveComponent() {
  const [data, setData] = useState();
  // Client-side logic
}
```

### Styling Approach
```tsx
// Using Tailwind classes
<div className="bg-[#1A1920] border border-[#2A2833] rounded-lg p-4">

// Using CSS variables for theming
<div className="bg-card border-border">
```

## Testing

### Local Development
```bash
# Start dev server
pnpm run dev

# Open browser
http://localhost:3000
```

### Type Checking
```bash
pnpm run type:check
```

### Linting
```bash
pnpm run lint:check
pnpm run lint:fix
```

## Common Issues & Solutions

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm run build
```

### Type Errors
```bash
# Check TypeScript
pnpm run type:check

# Generate Supabase types
mcp__supabase__generate_typescript_types
```

### Environment Variables
- Ensure `.env.local` exists for development
- Check Vercel dashboard for production vars
- Use `NEXT_PUBLIC_` prefix for client-side vars

## 🔴 CRITICAL REMINDERS

1. **ALWAYS use MCP tools** when available
2. **NEVER use git CLI** - use `mcp__github__*` functions
3. **Use anon key** for Supabase client (not service key)
4. **Run checks** before committing: `pnpm run check:all`
5. **Dark theme only** - maintain consistent palette
6. **App Router patterns** - use Server Components by default

## Performance Optimization

- **Server Components**: Default for data fetching
- **Client Components**: Only for interactivity
- **Image Optimization**: Use `next/image`
- **Font Optimization**: Geist font loaded optimally
- **Code Splitting**: Automatic with App Router

## Accessibility

All UI components follow accessibility best practices:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Recent Updates

- ✅ Upgraded to Next.js 15.2.4
- ✅ Implemented shadcn/ui component library
- ✅ Dark theme with purple accents
- ✅ Real-time Supabase subscriptions
- ✅ TypeScript strict mode enabled
- ✅ ESLint and type checking configured