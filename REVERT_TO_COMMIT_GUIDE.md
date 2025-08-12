# 🔄 Guia: Como Reverter para um Commit Específico no GitHub

Este guia explica como voltar seu código para uma versão anterior específica e sincronizar tudo localmente.

## 📋 Pré-requisitos

- Git instalado localmente
- Acesso ao repositório no GitHub
- Terminal/Prompt de comando

## 🎯 Método 1: Reverter Localmente e Fazer Push (RECOMENDADO)

### Passo 1: Fazer Backup (IMPORTANTE!)
```bash
# Criar uma cópia de segurança do projeto atual
cp -r ~/Documents/Projetos/XMXSystem ~/Documents/Projetos/XMXSystem_BACKUP_$(date +%Y%m%d)
```

### Passo 2: Encontrar o Commit Desejado

#### Opção A: Pelo Terminal
```bash
# Navegar até o diretório do projeto
cd ~/Documents/Projetos/XMXSystem

# Ver lista de commits com mensagens
git log --oneline -20

# Ver commits com mais detalhes (data, autor)
git log --pretty=format:"%h - %an, %ar : %s" -20
```

#### Opção B: Pelo GitHub (Visual)
1. Acesse: https://github.com/ctga09/XMXSystem/commits/main
2. Ou para o backend: https://github.com/ctga09/XMXSystem-Backend/commits/main
3. Clique em "< >" ao lado do commit desejado
4. Copie o hash do commit (ex: `1101a30`)

### Passo 3: Reverter para o Commit Específico

```bash
# Garantir que está no branch correto
git checkout main

# Fazer fetch das mudanças remotas
git fetch origin

# MÉTODO HARD RESET (substitui tudo - CUIDADO!)
git reset --hard <HASH_DO_COMMIT>

# Exemplo:
git reset --hard 1101a30
```

### Passo 4: Forçar Push para o GitHub

```bash
# ATENÇÃO: Isso sobrescreverá o histórico remoto!
git push origin main --force

# Ou se preferir ser mais seguro:
git push origin main --force-with-lease
```

## 🎯 Método 2: Clonar Diretamente do Commit Específico

### Para Frontend (XMXSystem)
```bash
# Remover diretório atual (CUIDADO!)
rm -rf ~/Documents/Projetos/XMXSystem

# Clonar o repositório
git clone https://github.com/ctga09/XMXSystem.git ~/Documents/Projetos/XMXSystem

# Entrar no diretório
cd ~/Documents/Projetos/XMXSystem

# Fazer checkout do commit específico
git checkout <HASH_DO_COMMIT>

# Criar um novo branch a partir desse commit
git checkout -b main-stable

# Forçar esse estado como o novo main
git branch -D main
git checkout -b main
git push origin main --force
```

### Para Backend (XMXSystem-Backend)
```bash
# Remover diretório atual do backend
rm -rf ~/Documents/Projetos/XMXSystem/backend

# Clonar o repositório do backend
git clone https://github.com/ctga09/XMXSystem-Backend.git ~/Documents/Projetos/XMXSystem/backend

# Entrar no diretório
cd ~/Documents/Projetos/XMXSystem/backend

# Fazer checkout do commit específico
git checkout <HASH_DO_COMMIT>

# Criar novo branch e forçar como main
git checkout -b main-stable
git branch -D main
git checkout -b main
git push origin main --force
```

## 🎯 Método 3: Usando GitHub Desktop (Interface Gráfica)

1. Abrir GitHub Desktop
2. Selecionar o repositório
3. Clicar em "History" (Histórico)
4. Encontrar o commit desejado
5. Clicar com botão direito → "Revert Changes in Commit"
6. Fazer Push

## 📝 Commits Importantes para Referência

### Frontend (XMXSystem)
```bash
# Commits estáveis conhecidos:
1101a30 - docs: update documentation with 100% operational status (06/08/2025)
2608ef9 - docs: comprehensive documentation update - 100% operational
f96d3c8 - feat: implement automatic BRL to USD conversion
```

### Backend (XMXSystem-Backend)
```bash
# Commits funcionais conhecidos:
c9700e9 - Initial commit: FastAPI webhook API for CartPanda integration
61f05e7 - feat: implement automatic BRL to USD conversion
```

## ⚠️ Avisos Importantes

### Antes de Reverter:
1. **SEMPRE faça backup** do código atual
2. **Commite mudanças locais** não salvas
3. **Avise a equipe** se trabalham no mesmo repositório
4. **Teste localmente** antes de fazer push

### Após Reverter:
1. **Reinstale dependências** se necessário:
   ```bash
   # Frontend
   cd frontend
   pnpm install
   
   # Backend
   cd backend
   pip install -r requirements.txt
   ```

2. **Reconfigure variáveis de ambiente**:
   ```bash
   # Copiar .env.example se existir
   cp .env.example .env.local
   ```

3. **Teste o sistema**:
   ```bash
   # Frontend
   pnpm run dev
   
   # Backend
   uvicorn app.main:app --reload
   ```

## 🔍 Verificar o Estado Atual

```bash
# Ver qual commit está atualmente
git log -1

# Ver status do repositório
git status

# Ver diferenças com o remoto
git diff origin/main

# Ver todos os branches
git branch -a
```

## 🆘 Troubleshooting

### Erro: "Your local changes would be overwritten"
```bash
# Salvar mudanças temporariamente
git stash

# Fazer o reset
git reset --hard <COMMIT>

# Recuperar mudanças se necessário
git stash pop
```

### Erro: "Failed to push (rejected)"
```bash
# Forçar push (CUIDADO!)
git push origin main --force
```

### Erro: "Detached HEAD state"
```bash
# Criar branch do estado atual
git checkout -b temp-branch

# Depois mover para main
git checkout main
git reset --hard temp-branch
git branch -d temp-branch
```

## 📊 Exemplo Completo

```bash
# 1. Backup
cp -r ~/Documents/Projetos/XMXSystem ~/Documents/Projetos/XMXSystem_BACKUP

# 2. Navegar para o projeto
cd ~/Documents/Projetos/XMXSystem

# 3. Ver commits disponíveis
git log --oneline -10

# 4. Escolher commit (exemplo: 1101a30)
git reset --hard 1101a30

# 5. Forçar push
git push origin main --force

# 6. Para o backend (se necessário)
cd backend
git reset --hard c9700e9
git push origin main --force

# 7. Verificar
git log -1
```

## 🔒 Recuperar se Algo Der Errado

Se você fez reset errado e quer voltar:

```bash
# Ver histórico de todas as ações (incluindo resets)
git reflog

# Encontrar o commit anterior ao reset
# Exemplo de saída:
# 1a2b3c4 HEAD@{0}: reset: moving to 1101a30
# 5d6e7f8 HEAD@{1}: commit: your last commit before reset

# Voltar para o estado anterior
git reset --hard HEAD@{1}
```

## 📌 Dica Final

Para evitar problemas futuros, considere:

1. **Criar tags** para versões estáveis:
   ```bash
   git tag -a v1.0-stable -m "Versão estável"
   git push origin v1.0-stable
   ```

2. **Usar branches** para desenvolvimento:
   ```bash
   git checkout -b development
   # Trabalhar aqui e só fazer merge quando estável
   ```

3. **Documentar commits importantes** em um arquivo CHANGELOG.md

---

**⚠️ LEMBRE-SE**: `git reset --hard` e `git push --force` são operações destrutivas. **SEMPRE FAÇA BACKUP ANTES!**