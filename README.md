# XMX Corp Dashboard 🚀

A modern, real-time business intelligence dashboard for XMX Corp, built with cutting-edge technologies to provide comprehensive sales tracking, affiliate management, and performance analytics.

🔗 **Live Demo**: [https://xmx-system.vercel.app](https://xmx-system.vercel.app)

## ✨ Features

- 📊 **Real-time Dashboard** - Live sales and performance metrics
- 👥 **Affiliate Management** - Track and manage affiliate partners
- 📈 **Advanced Analytics** - Comprehensive business insights
- 🌙 **Dark Mode** - Eye-friendly interface for extended use
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔒 **Secure Authentication** - Enterprise-grade security (coming soon)

## 🚀 Tech Stack

### Frontend (This Repository)
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI components
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Supabase](https://supabase.com/)** - Database and real-time subscriptions

### Backend (Separate Project - Not in this repo)
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[Python 3.11](https://www.python.org/)** - Backend runtime
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

```
XMXSystem/
├── frontend/               # Aplicação Next.js (commitado no GitHub)
│   ├── app/               # App Router
│   │   ├── (dashboard)/   # Rotas do dashboard
│   │   │   ├── affiliates/# Página de afiliados
│   │   │   ├── sales/     # Página de vendas
│   │   │   └── page.tsx   # Dashboard principal
│   │   └── login/         # Página de login
│   ├── components/        # Componentes reutilizáveis
│   │   └── ui/           # Componentes shadcn/ui
│   ├── lib/              # Utilitários
│   └── public/           # Assets estáticos
└── backend/              # API FastAPI (NÃO commitado - desenvolvimento local)
```

**Nota**: O diretório `/backend` está no `.gitignore` e não é versionado neste repositório.

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
- Deploy no Vercel
- Banco de dados Supabase configurado
- Backend API desenvolvido (FastAPI)

### 🔄 Em Progresso
- Integração frontend com Supabase
- Substituição de dados mockados por dados reais

### ⏳ Próximos Passos
- Deploy do backend no Google Cloud Run
- Autenticação com Supabase Auth
- Configuração de webhooks com CartPanda

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

## 🗺️ Roadmap

### Phase 1 - Foundation ✅
- [x] Project setup with Next.js 15
- [x] UI component library integration
- [x] Dark theme implementation
- [x] Basic routing structure
- [x] Supabase database setup
- [x] Frontend deployment on Vercel
- [x] Backend API development (FastAPI)

### Phase 2 - Core Features (Current)
- [x] Sales tracking API
- [ ] Real-time data synchronization with Supabase
- [ ] Authentication system with Supabase Auth
- [ ] Webhook integration with CartPanda
- [ ] Backend deployment on Google Cloud Run
- [ ] Live sales data in dashboard

### Phase 3 - Advanced Features
- [ ] Affiliate management system
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Export functionality
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered insights

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