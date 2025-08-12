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

<<<<<<< HEAD
## 🚀 Getting Started
=======
- 📊 **Real-time Dashboard** - Live sales metrics and KPIs with instant updates
- 💳 **Payment Processing** - CartPanda webhook integration **[100% Functional]**
- 💱 **USD/FX Conversion** - Automatic BRL→USD conversion with real-time exchange rates **[NEW ✅]**
  - **💵 Real-time FX**: Latest BRL→USD rates from dual providers
  - **🔄 Automatic Conversion**: All sales converted to USD at webhook time
  - **📊 Dashboard Display**: Shows USD when available, BRL fallback
  - **⚡ Performance Cache**: 60-second FX rate caching
  - **🔒 Idempotent**: Never recomputes for same transaction
- 📋 **Advanced Webhook Management** - Complete audit trail system **[FULLY OPERATIONAL]**
  - **🗃️ Dual Storage**: Both `sales` and `webhook_logs` tables working simultaneously
  - **📅 Interactive Date Picker**: Visual calendar with range selection
  - **🔍 Advanced Filtering**: Product search with real-time results
  - **📊 Live Statistics**: Total webhooks, approved sales, refunds dashboard
  - **🔄 Auto-refresh**: Real-time updates every 5 seconds
  - **📱 Responsive Design**: Works perfectly on all device sizes
  - **🎯 Complete Data Preservation**: All webhook payloads stored in JSONB format
  - **🚀 Zero Data Loss**: Robust error handling ensures no missed webhooks
- 👥 **Affiliate Management** - Track partner performance
- 📈 **Analytics** - Comprehensive business insights
- 🔄 **Live Updates** - Real-time data synchronization via Supabase
- 🌙 **Dark Theme** - Optimized for extended use with reduced eye strain
- 📱 **Responsive** - Mobile-first design that works on all devices
- 🔒 **Secure** - Enterprise-grade security with Row Level Security (RLS)
>>>>>>> e41597604e5dd45625667a58495266790218bf2b

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

<<<<<<< HEAD
4. **Run the development server:**
=======
### Backend (.env.local)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
CARTPANDA_WEBHOOK_SECRET=your_webhook_secret
ENVIRONMENT=development
```

### USD/FX and Commission Rules ✅

**Status: IMPLEMENTED & PRODUCTION READY**

- **Source Values**: `price` and `commission_value` are always in BRL
- **BRL Amount**: `amount_brl = line_items[0].price * line_items[0].quantity`
- **FX Rate**: Latest BRL→USD at webhook time (6 decimals precision)
  - Providers: exchangerate.host (primary), frankfurter.app (fallback)
  - Stored fields: `fx_at` (timestamp), `fx_source` (provider name)
- **USD Conversion**: `amount_usd = amount_brl × fx_rate_brl_usd` (2 decimals, ROUND_HALF_UP)
- **Commission USD**: `commission_usd = commission_value × fx_rate_brl_usd` (2 decimals)
- **Currency Info**: `payment_currency` is informational only
- **Idempotency**: Never recompute USD/FX for the same `cartpanda_id`
- **Production Validated**: 2 sales processed with USD (R$ 1.603,60 → US$ 295,43)

## 📝 Development Workflow

1. **Frontend Changes**: Push to main → Auto-deploy to Vercel
2. **Backend Changes**: Push to main → Auto-deploy to Cloud Run
3. **Database Changes**: Apply migrations via Supabase dashboard
4. **Testing**: Local development with hot reload

## 🧪 Testing & Quality Assurance

### Code Quality Checks
>>>>>>> e41597604e5dd45625667a58495266790218bf2b
```bash
pnpm dev
```

<<<<<<< HEAD
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
=======
### Webhook Testing
- **Local Testing**: Use replay script with real sanitized payloads
  ```bash
  # Test standard sale with USD conversion
  bash scripts/replay_cartpanda_webhook.sh \
    backend/tests/fixtures/cartpanda/order_paid_real_sanitized.json \
    http://localhost:8000/webhook/cartpanda
  
  # Test sale with affiliate commission in USD
  bash scripts/replay_cartpanda_webhook.sh \
    backend/tests/fixtures/cartpanda/order_paid_real_sanitized_commission.json \
    http://localhost:8000/webhook/cartpanda
  ```
- **Production Testing**: Live CartPanda webhooks processing correctly
- **USD Validation**: Check `amount_usd`, `fx_rate_brl_usd`, `commission_usd` in database
- **Monitoring**: Real-time logs at `/webhooks/logs`
>>>>>>> e41597604e5dd45625667a58495266790218bf2b

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
<<<<<<< HEAD
- **Backend API**: [https://xmx-backend-aquzld6ywq-uc.a.run.app](https://xmx-backend-aquzld6ywq-uc.a.run.app)
- **shadcn/ui Docs**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
=======
- **Live Application**: [xmx-system.vercel.app](https://xmx-system.vercel.app)
- **API Base URL**: [xmx-backend-aquzld6ywq-uc.a.run.app](https://xmx-backend-aquzld6ywq-uc.a.run.app)

## 🗺️ Roadmap

### ✅ Phase 1 - Foundation (Completed)
- Project setup and architecture
- Basic UI implementation
- Database configuration

### ✅ Phase 2 - Core Features (Completed)
- Sales tracking system
- Real-time data sync
- Webhook integration

### ✅ Phase 3 - Production Deployment (Completed)
- Cloud Run deployment
- CI/CD pipeline
- Production webhooks

### ✅ Phase 4 - Advanced Webhook Management (Completed)
- **✅ Dual Storage System**: Sales + Webhook logs tables
- **✅ Advanced Filtering**: Date ranges, product search, statistics
- **✅ Visual Interface**: Interactive calendar, real-time updates
- **✅ Error Resolution**: All JSON serialization bugs fixed
- **✅ Production Validation**: 100% webhook success rate

### ⏳ Phase 5 - Authentication & Advanced Features (In Progress)
- [ ] User authentication (Supabase Auth)
- [ ] Role-based access control
- [ ] Advanced analytics dashboard
- [ ] Data export functionality
- [ ] Email notifications
- [ ] Mobile app

## 🎯 Recent Achievements (Current Session)

### ✅ USD/FX Currency Conversion (NEW):
1. **Real-time FX Rates** - Dual providers with automatic fallback
2. **Automatic BRL→USD Conversion** - All sales converted at webhook time
3. **Frontend USD Display** - Dashboard shows USD when available
4. **Idempotent Processing** - Never recomputes for same transaction
5. **Production Validated** - 2 sales processed with USD successfully

### ✅ Critical Bug Fixes Resolved:
1. **DateTime Serialization Error** - Fixed with `sanitize_for_json()` function
2. **Webhook_logs Table Issues** - 100% operational with dual storage
3. **Silent Webhook Failures** - Comprehensive logging system implemented
4. **Decimal Conversion Errors** - Robust type conversion added
5. **Production Validation** - Live CartPanda webhooks processing successfully

### ✅ Enhanced Features Added:
1. **Emoji-coded Logging** - Real-time debugging with visual indicators
2. **Advanced Filtering System** - Date ranges, product search, statistics
3. **Visual Webhook Interface** - Interactive calendar and real-time updates
4. **Comprehensive Error Handling** - Zero data loss guarantee
5. **Production Monitoring** - Health checks and status monitoring

## 🔍 System Architecture Details

### Database Schema
```sql
-- Sales table (structured data for dashboard with USD/FX)
sales: cartpanda_id, customer_name, product_name, price, status, created_at,
       amount_brl, amount_usd, fx_rate_brl_usd, fx_at, fx_source,
       payment_currency, commission_value, commission_usd

-- Webhook_logs table (complete audit trail)
webhook_logs: id, event, order_id, customer_email, product_name, 
              webhook_data (JSONB), response_data (JSONB), received_at
```

### Webhook Processing Flow
1. **CartPanda** sends webhook → **Backend API**
2. **Backend** processes and saves to **both tables** simultaneously
3. **Frontend** receives real-time updates via **Supabase subscriptions**
4. **Monitoring** tracks all events with detailed logging
>>>>>>> e41597604e5dd45625667a58495266790218bf2b

## 📄 License

This project is proprietary software owned by XMX Corp. All rights reserved.

---

Built with ❤️ using Next.js, shadcn/ui, and Supabase