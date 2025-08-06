# XMX System 🚀

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black.svg)](https://github.com/ctga09/XMXSystem)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-green.svg)](https://github.com/ctga09/XMXSystem-Backend)
[![Database](https://img.shields.io/badge/Database-Supabase-3ECF8E.svg)](https://supabase.com)
[![Frontend Deploy](https://img.shields.io/badge/Frontend-Vercel-black.svg)](https://xmx-system.vercel.app)
[![Backend Deploy](https://img.shields.io/badge/Backend-Cloud%20Run-4285F4.svg)](https://xmx-backend-aquzld6ywq-uc.a.run.app)

A modern, real-time business intelligence platform for XMX Corp, featuring comprehensive sales tracking, affiliate management, and performance analytics.

## 🏗️ Architecture Overview

XMX System is built as a modern microservices architecture with separated frontend and backend services:

```
┌─────────────────────────────────────────────────────────────┐
│                         XMX System                           │
├───────────────────────────┬─────────────────────────────────┤
│       Frontend            │           Backend                │
│   Next.js Dashboard       │       FastAPI Webhook           │
│    (Vercel Deploy)        │     (Cloud Run Deploy)          │
│                           │                                  │
│   React + TypeScript      │      Python 3.11                │
│   Tailwind CSS + shadcn   │      Async Processing           │
│   Real-time Updates       │      CartPanda Integration      │
└───────────────────────────┴─────────────────────────────────┘
                            │
                    ┌───────┴────────┐
                    │    Supabase    │
                    │   PostgreSQL   │
                    │   Real-time    │
                    └────────────────┘
```

## 🔗 Production URLs

- **Frontend Dashboard**: [https://xmx-system.vercel.app](https://xmx-system.vercel.app)
- **Backend API**: [https://xmx-backend-aquzld6ywq-uc.a.run.app](https://xmx-backend-aquzld6ywq-uc.a.run.app)
- **API Documentation**: [https://xmx-backend-aquzld6ywq-uc.a.run.app/docs](https://xmx-backend-aquzld6ywq-uc.a.run.app/docs)

## 📦 Repository Structure

This project is organized as a monorepo with separated backend service:

### Frontend (This Repository)
```
XMXSystem/
├── frontend/          # Next.js dashboard application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   └── README.md     # Frontend documentation
├── backend/          # Local development copy (excluded from git)
└── README.md         # This file
```

### Backend (Separate Repository)
- **Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- **Purpose**: Webhook processing, API endpoints, CartPanda integration
- **Deployment**: Google Cloud Run with automatic CI/CD

## 🚀 Quick Start

### Frontend Development
```bash
# Clone and navigate to frontend
git clone https://github.com/ctga09/XMXSystem.git
cd XMXSystem/frontend

# Install and run
pnpm install
pnpm dev
```
📖 [Full Frontend Documentation](./frontend/README.md)

### Backend Development
```bash
# Clone backend repository
git clone https://github.com/ctga09/XMXSystem-Backend.git
cd XMXSystem-Backend

# Setup and run
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
📖 [Full Backend Documentation](https://github.com/ctga09/XMXSystem-Backend)

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (Real-time subscriptions)
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: Supabase (PostgreSQL)
- **Container**: Docker + Artifact Registry
- **Deployment**: Google Cloud Run
- **CI/CD**: GitHub Actions

## ✨ Key Features

- 📊 **Real-time Dashboard** - Live sales metrics and KPIs
- 💳 **Payment Processing** - CartPanda webhook integration
- 👥 **Affiliate Management** - Track partner performance
- 📈 **Analytics** - Comprehensive business insights
- 🔄 **Live Updates** - Real-time data synchronization
- 🌙 **Dark Theme** - Optimized for extended use
- 📱 **Responsive** - Works on all devices
- 🔒 **Secure** - Enterprise-grade security

## 🚦 Deployment Status

| Service | Status | URL | Auto-Deploy |
|---------|--------|-----|-------------|
| Frontend | ✅ Live | [Vercel](https://xmx-system.vercel.app) | Yes (main branch) |
| Backend | ✅ Live | [Cloud Run](https://xmx-backend-aquzld6ywq-uc.a.run.app) | Yes (main branch) |
| Database | ✅ Active | Supabase | N/A |
| Webhooks | ✅ Configured | CartPanda | N/A |

## 📊 System Status

- **Frontend Build**: ![Vercel](https://img.shields.io/badge/build-passing-brightgreen)
- **Backend Build**: [![Deploy to Cloud Run](https://github.com/ctga09/XMXSystem-Backend/actions/workflows/deploy.yml/badge.svg)](https://github.com/ctga09/XMXSystem-Backend/actions/workflows/deploy.yml)
- **API Health**: [Check Status](https://xmx-backend-aquzld6ywq-uc.a.run.app/health)

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (.env.local)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
CARTPANDA_WEBHOOK_SECRET=your_webhook_secret
ENVIRONMENT=development
```

## 📝 Development Workflow

1. **Frontend Changes**: Push to main → Auto-deploy to Vercel
2. **Backend Changes**: Push to main → Auto-deploy to Cloud Run
3. **Database Changes**: Apply migrations via Supabase dashboard
4. **Testing**: Local development with hot reload

## 🤝 Contributing

### Code Quality Checks
```bash
# Frontend
cd frontend
pnpm check:all

# Backend
cd backend
python -m pytest
```

### Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: tests
chore: maintenance
```

## 📚 Documentation

- 📖 [Frontend Documentation](./frontend/README.md)
- 📖 [Backend Documentation](https://github.com/ctga09/XMXSystem-Backend)
- 📖 [API Documentation](https://xmx-backend-aquzld6ywq-uc.a.run.app/docs)
- 📖 [Claude Code Instructions](./CLAUDE.md)
- 📖 [Deployment Guide](https://github.com/ctga09/XMXSystem-Backend/blob/main/DEPLOYMENT.md)

## 🔗 Related Links

- **Frontend Repository**: [XMXSystem](https://github.com/ctga09/XMXSystem)
- **Backend Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
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

### ⏳ Phase 4 - Advanced Features (In Progress)
- [ ] User authentication (Supabase Auth)
- [ ] Advanced analytics dashboard
- [ ] Export functionality
- [ ] Email notifications
- [ ] Mobile app

## 📄 License

This project is proprietary software owned by XMX Corp. All rights reserved.

---

<p align="center">
  <strong>XMX System</strong> - Empowering Business Intelligence
  <br>
  Built with ❤️ by XMX Corp Development Team
</p>