# XMX System - Frontend 🎨

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://xmx-system.vercel.app)

Modern dashboard interface for XMX Corp, built with Next.js 15 and real-time data synchronization.

**Live Demo**: [https://xmx-system.vercel.app](https://xmx-system.vercel.app)

## ✨ Features

- 📊 **Real-time Dashboard** - Live sales and performance metrics
- 👥 **Affiliate Management** - Track and manage affiliate partners
- 📈 **Advanced Analytics** - Comprehensive business insights
- 🌙 **Dark Mode** - Eye-friendly interface optimized for extended use
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔄 **Real-time Updates** - Instant data synchronization via Supabase
- 🎨 **Modern UI** - Built with shadcn/ui components

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Supabase](https://supabase.com/)** - Database and real-time subscriptions
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 📋 Prerequisites

- Node.js 18.0 or higher
- pnpm installed globally (`npm install -g pnpm`)
- Environment variables configured (see Environment Variables section)

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ctga09/XMXSystem.git
cd XMXSystem/frontend
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Configure environment variables:**
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. **Run the development server:**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

```bash
# Development
pnpm dev                # Start development server (port 3000)

# Build & Production
pnpm build              # Create production build
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:check         # Check for linting issues
pnpm lint:fix           # Auto-fix linting issues
pnpm type:check         # Check TypeScript types
pnpm check:all          # Run all checks (types + lint)
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── page.tsx       # Main dashboard
│   │   ├── sales/         # Sales page
│   │   └── affiliates/    # Affiliates page
│   ├── login/             # Authentication page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme context
├── hooks/                 # Custom React hooks
│   ├── use-sales.ts      # Sales data hook
│   ├── use-dashboard-metrics.ts # Dashboard metrics
│   └── use-toast.ts      # Toast notifications
├── lib/                   # Utility functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🎨 UI Components

This project uses **shadcn/ui**, a collection of reusable components built with Radix UI and Tailwind CSS. Components are located in `components/ui/` and include:

- Accordion, Alert, Avatar, Badge
- Button, Card, Calendar, Carousel
- Chart, Checkbox, Command, Dialog
- Form, Input, Select, Table
- Toast, Tooltip, and many more...

## 🎭 Theme & Design System

### Color Palette
- **Background Primary**: `#0D0C12`
- **Background Secondary**: `#1A1920`
- **Border**: `#2A2833`
- **Primary Accent**: `#5F2EEA` (Purple)

### Typography
- **Font Family**: Geist (Variable font)
- **Responsive sizing with fluid typography**

### Dark Mode
The application is optimized for dark mode with carefully selected colors for reduced eye strain during extended use.

## 🔌 API Integration

### Supabase Integration
- Real-time data synchronization
- Row Level Security (RLS) enabled
- Optimistic updates for better UX

### Custom Hooks
- `useSales()` - Fetches and manages sales data
- `useDashboardMetrics()` - Aggregates dashboard statistics
- Real-time subscriptions for live updates

## 🚀 Deployment

### Vercel (Production)
The frontend is deployed on Vercel with automatic deployments from the main branch.

**Production URL**: [https://xmx-system.vercel.app](https://xmx-system.vercel.app)

### Environment Variables (Vercel)
Configure these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Testing

```bash
# Type checking
pnpm type:check

# Linting
pnpm lint:check

# Run all checks before committing
pnpm check:all
```

## 🤝 Contributing

1. **Check code quality before committing:**
```bash
pnpm check:all
```

2. **Fix formatting issues:**
```bash
pnpm lint:fix
```

3. **Follow the commit convention:**
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code improvements
test: add tests
chore: maintenance tasks
```

## 📝 Development Guidelines

### Code Style
- ESLint and TypeScript checks are enforced
- Follow the existing component patterns
- Use shadcn/ui components when possible
- Maintain consistent dark theme styling

### Best Practices
- Always run `pnpm check:all` before committing
- Use TypeScript strict mode
- Implement proper error handling
- Follow React best practices and hooks rules
- Keep components small and focused

## 🔗 Related Resources

- **Backend Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- **Backend API**: [https://xmx-backend-aquzld6ywq-uc.a.run.app](https://xmx-backend-aquzld6ywq-uc.a.run.app)
- **shadcn/ui Docs**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

## 📄 License

This project is proprietary software owned by XMX Corp. All rights reserved.

---

Built with ❤️ using Next.js, shadcn/ui, and Supabase