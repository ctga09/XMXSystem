# 🚨 Configuração de Variáveis de Ambiente no Vercel

## Problema
O deploy está falhando com o erro: `Error: supabaseUrl is required`

Isso acontece porque:
- O arquivo `.env.local` está no `.gitignore` (correto por segurança)
- O Vercel não tem acesso às variáveis de ambiente do Supabase

## Solução: Configurar no Dashboard do Vercel

### 1. Acesse o Vercel Dashboard
https://vercel.com/dashboard

### 2. Selecione seu projeto
Clique no projeto **XMXSystem**

### 3. Vá em Settings → Environment Variables

### 4. Adicione as seguintes variáveis:

#### NEXT_PUBLIC_SUPABASE_URL
```
https://sclscnnfdeoylftoxmzf.supabase.co
```

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbHNjbm5mZGVveWxmdG94bXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjA1NzIsImV4cCI6MjA2OTkzNjU3Mn0.u_5s0g92PgGPuMvCr_pLAbz58Cc8M-4pCdvS46K7NO4
```

### 5. Configurações importantes:
- ✅ Marque todas as opções: **Production**, **Preview**, **Development**
- ✅ Use a **anon key** (não a service role key)
- ✅ O prefixo `NEXT_PUBLIC_` é obrigatório

### 6. Clique em "Save"

### 7. Faça o Redeploy
- Vá em **Deployments**
- Clique nos 3 pontinhos do último deploy falho
- Selecione **"Redeploy"**

## Por que isso é necessário?

1. **Segurança**: Nunca commitamos chaves de API no GitHub
2. **Build Time**: Next.js precisa das variáveis durante o build
3. **NEXT_PUBLIC_**: Prefix necessário para variáveis acessíveis no cliente

## Verificação

Após o deploy bem-sucedido, você pode verificar:
- Acesse sua aplicação em produção
- Abra o console do navegador (F12)
- Deve ver logs como: `Supabase URL: https://sclscnnfdeoylftoxmzf.supabase.co`

## Alternativa (Não Recomendada)

Se quiser que o Vercel leia automaticamente, você poderia:
1. Remover `.env*.local` do `.gitignore` 
2. Commitar o `.env.local`

⚠️ **NÃO FAÇA ISSO!** Expõe suas chaves no GitHub.

## Referência

O arquivo `.env.example` foi criado em `.env.example` para documentar quais variáveis são necessárias.