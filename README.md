# XMX Corp Dashboard

Sistema de dashboard empresarial para gerenciamento de vendas e afiliados da XMX Corp.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utility-first
- **shadcn/ui** - Componentes UI modernos
- **pnpm** - Gerenciador de pacotes rápido

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

## 📝 Notas Importantes

- ESLint e TypeScript checks estão habilitados
- Utilize os scripts de verificação antes de fazer commits
- O projeto usa pnpm como gerenciador de pacotes
- Configuração para Claude Code disponível em `CLAUDE.md`