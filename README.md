# XMX Corp Dashboard 🚀

A modern, real-time business intelligence dashboard for XMX Corp, built with cutting-edge technologies to provide comprehensive sales tracking, affiliate management, and performance analytics.

## ✨ Features

- 📊 **Real-time Dashboard** - Live sales and performance metrics
- 👥 **Affiliate Management** - Track and manage affiliate partners
- 📈 **Advanced Analytics** - Comprehensive business insights
- 🌙 **Dark Mode** - Eye-friendly interface for extended use
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔒 **Secure Authentication** - Enterprise-grade security (coming soon)

## 🚀 Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern UI components
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

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
├── frontend/               # Aplicação Next.js
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
└── backend/              # (Vazio - futuro backend)
```

## 🎨 Tema e Design

O projeto utiliza um tema dark personalizado com a seguinte paleta de cores:

- Background principal: `#0D0C12`
- Background secundário: `#1A1920`
- Bordas: `#2A2833`
- Cor primária (roxo): `#5F2EEA`

## 🚦 Status do Projeto

- ✅ Interface do dashboard implementada
- ✅ Sistema de navegação com sidebar
- ✅ Páginas de vendas e afiliados
- ✅ Tema dark consistente
- ⏳ Backend em desenvolvimento
- ⏳ Autenticação real pendente
- ⏳ Integração com API pendente

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

### Phase 1 - Foundation (Current)
- [x] Project setup with Next.js 15
- [x] UI component library integration
- [x] Dark theme implementation
- [x] Basic routing structure
- [ ] Supabase integration
- [ ] Authentication system

### Phase 2 - Core Features
- [ ] Real-time data synchronization
- [ ] Sales tracking API
- [ ] Affiliate management system
- [ ] Analytics dashboard
- [ ] Email notifications

### Phase 3 - Advanced Features
- [ ] AI-powered insights
- [ ] Export functionality
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced reporting

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