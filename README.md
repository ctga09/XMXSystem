# XMX Corp Dashboard 🚀

A modern, real-time business intelligence dashboard for XMX Corp, built with cutting-edge technologies to provide comprehensive sales tracking, affiliate management, and performance analytics.

🔗 **Live Demo**: [https://xmx-system.vercel.app](https://xmx-system.vercel.app)

## ✨ Features

- 📊 **Real-time Dashboard** - Live sales and performance metrics with Supabase integration
- 👥 **Affiliate Management** - Track and manage affiliate partners
- 📈 **Advanced Analytics** - Comprehensive business insights with real data
- 🌙 **Dark Mode** - Eye-friendly interface for extended use
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔄 **Real-time Updates** - Instant data synchronization via Supabase
- 🔒 **Secure Authentication** - Enterprise-grade security (coming soon)

## 🚀 Tech Stack

### Frontend (This Repository)
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI components
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Supabase](https://supabase.com/)** - Database and real-time subscriptions

### Backend (Separate Repository)
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Python 3.11](https://www.python.org/)** - Backend runtime
- **Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- **Google Cloud Run** - Serverless deployment (planned)

## 📋 Pré-requisitos

- Node.js 18.0 ou superior
- pnpm instalado globalmente (`npm install -g pnpm`)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [seu-repositorio]
cd XMXSystem
```

2. Navegue para o frontend:
```bash
cd frontend
```

3. Instale as dependências:
```bash
pnpm install
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                # Inicia servidor de desenvolvimento

# Build e Produção
pnpm build              # Cria build de produção
pnpm start              # Inicia servidor de produção

# Qualidade de Código
pnpm lint               # Executa ESLint
pnpm lint:check         # Verifica problemas de lint
pnpm lint:fix           # Corrige problemas automaticamente
pnpm type:check         # Verifica tipos TypeScript
pnpm check:all          # Executa todas as verificações
```

## 📁 Estrutura do Projeto

### Frontend (Este repositório)
```
XMXSystem/
└── frontend/               # Aplicação Next.js
    ├── app/               # App Router
    │   ├── (dashboard)/   # Rotas do dashboard
    │   │   ├── affiliates/# Página de afiliados
    │   │   ├── sales/     # Página de vendas
    │   │   └── page.tsx   # Dashboard principal
    │   └── login/         # Página de login
    ├── components/        # Componentes reutilizáveis
    │   └── ui/           # Componentes shadcn/ui
    ├── lib/              # Utilitários
    └── public/           # Assets estáticos
```

### Backend (Repositório separado)
- **Repository**: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- **Tech**: FastAPI + Python 3.11
- **Deploy**: Google Cloud Run (planejado)

## 🎨 Tema e Design

O projeto utiliza um tema dark personalizado com a seguinte paleta de cores:

- Background principal: `#0D0C12`
- Background secundário: `#1A1920`
- Bordas: `#2A2833`
- Cor primária (roxo): `#5F2EEA`

## 🚦 Status do Projeto

### ✅ Concluído
- Interface do dashboard implementada
- Sistema de navegação com sidebar
- Páginas de vendas e afiliados
- Tema dark consistente
- Deploy no Vercel com variáveis de ambiente configuradas
- Banco de dados Supabase configurado com RLS
- Backend API desenvolvido (FastAPI/Python)
- Frontend integrado com Supabase
- Dashboard e vendas exibindo dados reais
- Real-time updates funcionando
- Hooks React para dados (useSales, useDashboardMetrics)
- Webhook endpoint implementado e testado
- Integração com CartPanda funcionando (formato real)
- Sistema de logs para monitorar webhooks
- Teste local com ngrok configurado
- Backend separado em repositório próprio
- Todos os bugs de webhook corrigidos (Decimal, transaction_id)
- Integração com CartPanda 100% funcional

### 🔄 Em Progresso
- Deploy do backend no Google Cloud Run

### ⏳ Próximos Passos
- Configurar URL de produção do webhook na CartPanda
- Autenticação com Supabase Auth
- Página de afiliados com dados reais
- Relatórios e analytics avançados

## 🤝 Contribuindo

1. Verifique o código antes de commitar:
```bash
pnpm check:all
```

2. Corrija problemas de formatação:
```bash
pnpm lint:fix
```

## 📝 Important Notes

- ESLint and TypeScript checks are enabled
- Always run verification scripts before committing
- The project uses pnpm as the package manager
- Claude Code configuration available in `CLAUDE.md`
- Backend has its own repository: [XMXSystem-Backend](https://github.com/ctga09/XMXSystem-Backend)
- Environment variables must be configured in Vercel dashboard
- Webhook data is saved with `CP_` prefix to identify CartPanda orders
- All webhook integration bugs have been fixed and tested
- Repository separation completed on January 5, 2025

## 🗺️ Roadmap

### Phase 1 - Foundation ✅
- [x] Project setup with Next.js 15
- [x] UI component library integration
- [x] Dark theme implementation
- [x] Basic routing structure
- [x] Supabase database setup
- [x] Frontend deployment on Vercel
- [x] Backend API development (FastAPI)

### Phase 2 - Core Features ✅
- [x] Sales tracking API with FastAPI
- [x] Real-time data synchronization with Supabase
- [x] Live sales data in dashboard
- [x] Frontend hooks for data fetching
- [x] Webhook integration with CartPanda
- [x] Webhook logging and monitoring system
- [x] Ngrok setup for local testing

### Phase 3 - Production Deployment (Current)
- [ ] Backend deployment on Google Cloud Run
- [ ] Production webhook URL configuration
- [ ] Authentication system with Supabase Auth
- [ ] SSL certificates and security hardening

### Phase 4 - Advanced Features
- [ ] Affiliate management system with real data
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Export functionality (CSV, PDF)
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered insights and predictions

## 🤝 Contributing

1. Check code quality before committing:
```bash
pnpm check:all
```

2. Fix formatting issues:
```bash
pnpm lint:fix
```

3. Follow the commit message convention:
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code improvements
test: add tests
chore: maintenance tasks
```

## 📄 License

This project is proprietary software owned by XMX Corp. All rights reserved.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and shadcn/ui
- Special thanks to the open-source community

---

<p align="center">
  <strong>XMX Corp Dashboard</strong> - Empowering Business Intelligence
</p>