# Guia de Deploy do XMXSystem no Vercel

Este guia detalha o processo completo para fazer o deploy do projeto XMXSystem na plataforma Vercel.

## 📋 Pré-requisitos

- Conta no GitHub (✅ já configurada)
- Repositório no GitHub (✅ https://github.com/ctga09/XMXSystem)
- Conta no Vercel (criar em https://vercel.com se ainda não tiver)

## 🚀 Passo a Passo

### 1. Acessar o Vercel

1. Abra seu navegador e acesse https://vercel.com
2. Clique no botão **"Sign Up"** ou **"Log In"** no canto superior direito

### 2. Autenticação

1. Escolha **"Continue with GitHub"**
2. Autorize o Vercel a acessar sua conta GitHub
3. Permita as permissões solicitadas (necessário para importar repositórios)

### 3. Importar Projeto

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Na seção "Import Git Repository", procure por **"XMXSystem"**
3. Clique no botão **"Import"** ao lado do repositório

### 4. Configurar Build & Deploy

Na tela de configuração, ajuste os seguintes campos:

#### **Project Name**
- Nome: `xmxsystem` (ou outro de sua preferência)
- Este será usado na URL: `xmxsystem.vercel.app`

#### **Framework Preset**
- Selecione: **Next.js**
- O Vercel detectará automaticamente, mas confirme a seleção

#### **Root Directory**
- Configure para: **`frontend`**
- ⚠️ IMPORTANTE: Clique em "Edit" e digite `frontend`
- Isso é essencial pois nosso projeto Next.js está na pasta frontend

#### **Build and Output Settings**

Clique em "Override" se necessário e configure:

- **Build Command**: `pnpm run build`
- **Output Directory**: `.next` (padrão do Next.js)
- **Install Command**: `pnpm install`
- **Development Command**: `pnpm run dev`

#### **Node.js Version**
- Selecione: **18.x** ou **20.x**

### 5. Variáveis de Ambiente (Opcional)

Se você tiver variáveis de ambiente futuras:

1. Clique em **"Environment Variables"**
2. Adicione as variáveis necessárias:
   - **Name**: Nome da variável (ex: `API_URL`)
   - **Value**: Valor da variável
   - **Environment**: Selecione onde aplicar (Production/Preview/Development)

**Nota**: Atualmente o projeto não requer variáveis de ambiente.

### 6. Deploy

1. Revise todas as configurações
2. Clique no botão **"Deploy"**
3. Aguarde o processo de build e deploy (geralmente 2-5 minutos)

### 7. Acompanhar o Deploy

Durante o deploy, você verá:

1. **Installing dependencies** - Instalação dos pacotes com pnpm
2. **Building** - Build do projeto Next.js
3. **Deploying** - Upload dos arquivos para a CDN do Vercel

Se houver erros, eles aparecerão no log em tempo real.

## 🎯 Após o Deploy

### URLs Geradas

Após o deploy bem-sucedido, você terá acesso a:

1. **URL de Produção**: `https://xmxsystem.vercel.app`
2. **URL Única do Deploy**: `https://xmxsystem-[hash].vercel.app`
3. **Preview URLs**: Para cada PR no GitHub

### Domínio Customizado (Opcional)

Para adicionar um domínio próprio:

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `dashboard.xmxcorp.com`)
3. Configure os DNS conforme instruções do Vercel

### Configurações Recomendadas

No painel do projeto no Vercel:

1. **Settings** → **General**:
   - Production Branch: `main`
   - Habilite "Auto-deploy" para deploys automáticos

2. **Settings** → **Functions**:
   - Region: Escolha a mais próxima dos usuários

3. **Settings** → **Security**:
   - Habilite "HTTPS Only"

## 🔄 Deploys Automáticos

Com a integração GitHub configurada:

- **Push para `main`**: Deploy automático em produção
- **Pull Requests**: Deploy de preview com URL única
- **Comentários no PR**: Bot do Vercel comenta com a URL de preview

## 🛠️ Troubleshooting

### Erro: "No framework detected"
- Verifique se o Root Directory está configurado como `frontend`

### Erro: "Build failed"
- Verifique os logs de build
- Confirme que o comando de build está correto: `pnpm run build`

### Erro: "pnpm: command not found"
- O Vercel suporta pnpm nativamente
- Verifique se o Install Command está como `pnpm install`

### Página 404 após deploy
- Verifique se o Root Directory está correto
- Confirme que o build gerou a pasta `.next`

## 📊 Monitoramento

No dashboard do Vercel, você pode:

1. **Analytics**: Ver métricas de performance
2. **Functions**: Monitorar API Routes
3. **Logs**: Acessar logs em tempo real
4. **Speed Insights**: Analisar Core Web Vitals

## 🔒 Segurança

1. Nunca commite variáveis de ambiente sensíveis no código
2. Use o painel do Vercel para gerenciar secrets
3. Configure diferentes valores para Production/Preview/Development

## 📝 Comandos Úteis

### Vercel CLI (Alternativa)

Se preferir usar a CLI no futuro:

```bash
# Instalar globalmente
npm i -g vercel

# Deploy
cd frontend
vercel

# Deploy em produção
vercel --prod
```

## 🎉 Conclusão

Após seguir estes passos, seu dashboard XMXSystem estará disponível online com:

- ✅ HTTPS automático
- ✅ CDN global
- ✅ Deploys automáticos
- ✅ Preview deployments
- ✅ Rollback fácil
- ✅ Monitoramento integrado

## 📚 Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Next.js no Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Guia de Troubleshooting](https://vercel.com/docs/troubleshooting)

---

**Última atualização**: 05 de Agosto de 2025