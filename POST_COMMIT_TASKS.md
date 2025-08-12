# 📋 Tarefas Pós-Commit de Reorganização

Este arquivo lista as alterações necessárias após o commit de reorganização estrutural.

## 🚨 CRÍTICO - Fazer IMEDIATAMENTE após o push

### 1. Vercel Dashboard Configuration
**URL**: https://vercel.com/[seu-usuario]/xmx-system/settings/general

**Alterar Root Directory:**
- **De**: `frontend`
- **Para**: `.` (ou deixar vazio)

**Como fazer:**
1. Acesse Settings → General
2. Em "Root Directory", remova `frontend`
3. Clique em "Save"
4. O Vercel fará redeploy automático

## ✅ Alterações Secundárias (podem ser feitas depois)

### 2. Atualizar package.json
**Arquivo**: `package.json`
```json
// Linha 2 - mudar de:
"name": "my-v0-project",
// Para:
"name": "xmx-system",
```

### 3. Limpar Documentação
Pequenas referências a remover:

**README.md** - Linha 88
- Remover menção a `frontend/` na estrutura de pastas

**CLAUDE.md** - Linha 72  
- Ajustar estrutura de pastas removendo `frontend/`

**docs/VERCEL_ENV_SETUP.md** - Linha 67
- Mudar: `frontend/.env.example`
- Para: `.env.example`

### 4. Remover Arquivo Temporário
Após completar todas as tarefas:
```bash
rm POST_COMMIT_TASKS.md
rm SEPARATION_COMPLETE.md
```

## ✅ Verificações

### O que NÃO precisa mudar:
- ✅ `tsconfig.json` - paths já estão corretos
- ✅ `next.config.mjs` - sem referências a caminhos
- ✅ `.gitignore` - já está correto
- ✅ Scripts npm - funcionam normalmente
- ✅ Imports do código - usam `@/` que já está configurado

### Como testar se está tudo OK:
```bash
# Após as mudanças no Vercel
npm run build
npm run dev
```

Se ambos funcionarem, está tudo certo!

## 📊 Status do Deploy

- [ ] Root Directory alterado no Vercel
- [ ] Deploy automático bem-sucedido
- [ ] package.json name atualizado
- [ ] Documentação limpa
- [ ] Arquivos temporários removidos

---

**Nota**: As únicas mudanças realmente necessárias são no Vercel. O resto é cosmético/documentação.