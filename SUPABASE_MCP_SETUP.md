# Guia de Configuração do Supabase MCP Server para Claude Code

Este guia detalha como configurar o Model Context Protocol (MCP) do Supabase para usar localmente com Claude Code no projeto XMXSystem.

## 🎯 O que é o MCP?

O Model Context Protocol (MCP) é um protocolo que permite que LLMs como o Claude interajam diretamente com serviços externos. Com o MCP do Supabase, você pode:

- Criar e gerenciar tabelas de banco de dados
- Executar queries SQL
- Gerenciar configurações do projeto
- Trabalhar com Edge Functions
- Tudo isso usando linguagem natural diretamente no Claude Code!

## 📋 Pré-requisitos

1. **Node.js instalado** (versão 18 ou superior)
   ```bash
   node --version
   ```

2. **Conta no Supabase** com pelo menos um projeto criado
   - Acesse https://supabase.com se ainda não tiver

3. **Claude Code** instalado e funcionando

4. **Token de Acesso Pessoal do Supabase** (✅ você já tem!)

## 🚀 Guia Rápido - Configuração em 5 Minutos

### 📍 Passo 1: Obter o Project Reference do seu Projeto Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. No menu lateral, clique em **Settings** (ícone de engrenagem ⚙️)
3. Na aba **General**, procure por **Reference ID**
4. Copie o valor (formato: `abcdefghijklmnop`)
   
   **Exemplo visual:**
   ```
   Reference ID
   ┌─────────────────────────┐
   │ abcdefghijklmnop        │ [Copy]
   └─────────────────────────┘
   ```

### 📝 Passo 2: Configurar o arquivo .mcp.json

O projeto XMXSystem já possui um arquivo `.mcp.json` com o GitHub configurado. Vamos adicionar o Supabase:

1. **Abra o arquivo `.mcp.json` no editor de sua preferência**
   ```bash
   # No terminal, na raiz do projeto
   code .mcp.json
   # ou
   nano .mcp.json
   ```

2. **Adicione a configuração do Supabase** ao JSON existente:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio", 
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxx" // Mantenha seu token atual
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=COLE_SEU_PROJECT_REF_AQUI"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "COLE_SEU_TOKEN_AQUI"
      }
    }
  }
}
```

3. **Substitua os valores:**
   - `COLE_SEU_PROJECT_REF_AQUI` → pelo Reference ID que você copiou
   - `COLE_SEU_TOKEN_AQUI` → pelo token do Supabase que você já tem
   
   **⚠️ IMPORTANTE**: 
   - Mantenha o token do GitHub intacto
   - Adicione uma vírgula após o fechamento da chave do GitHub
   - Use aspas duplas no JSON

### 🔄 Passo 3: Salvar e Reiniciar Claude Code

1. **Salve o arquivo `.mcp.json`**
   - Ctrl+S (Windows/Linux) ou Cmd+S (Mac)

2. **Feche COMPLETAMENTE o Claude Code**
   - No Mac: Cmd+Q
   - No Windows/Linux: Alt+F4
   - Ou clique com botão direito no ícone e escolha "Quit"

3. **Abra o Claude Code novamente**

### ✅ Passo 4: Verificar se Funcionou

Assim que o Claude Code abrir, teste com estes comandos exatos:

1. **Primeiro teste (verificar conexão):**
   ```
   "Mostre as informações do meu projeto Supabase"
   ```
   
   **Resposta esperada:** Claude deve mostrar detalhes como URL da API, região, etc.

2. **Segundo teste (listar tabelas):**
   ```
   "Liste todas as tabelas do meu banco de dados Supabase"
   ```
   
   **Resposta esperada:** Lista de tabelas (pode estar vazia se for projeto novo)

3. **Terceiro teste (verificar MCP ativo):**
   ```
   "Quais ferramentas MCP estão disponíveis?"
   ```
   
   **Resposta esperada:** Deve incluir ferramentas do Supabase como `query_supabase`, `list_tables`, etc.

### 🎯 Passo 5: Usar o MCP no Projeto XMXSystem

Agora você pode usar comandos práticos para o desenvolvimento:

#### Criar estrutura inicial do banco de dados:
```
"Crie no Supabase as seguintes tabelas para o dashboard XMXSystem:
- users (id, email, name, role, created_at)
- sales (id, user_id, amount, date, status, created_at)
- affiliates (id, user_id, name, commission_rate, status, created_at)"
```

#### Verificar estrutura criada:
```
"Mostre a estrutura de todas as tabelas do banco"
```

#### Inserir dados de teste:
```
"Insira alguns dados de exemplo na tabela sales para testar o dashboard"
```

## 🐛 Troubleshooting Detalhado

### ❌ "MCP server not found" ou Claude não reconhece comandos Supabase

**Verificações passo a passo:**

1. **Confirme que o arquivo foi salvo corretamente:**
   ```bash
   cat .mcp.json | grep supabase
   ```
   Deve mostrar a configuração do Supabase

2. **Verifique a sintaxe JSON:**
   ```bash
   # No terminal
   node -e "console.log(JSON.parse(require('fs').readFileSync('.mcp.json', 'utf8')))"
   ```
   Se houver erro de sintaxe, será mostrado

3. **Certifique-se de que reiniciou completamente:**
   - Force quit do Claude Code (não apenas fechar a janela)
   - Aguarde 5 segundos
   - Abra novamente

### ❌ "Authentication failed" ou "Invalid token"

1. **Verifique se o token não tem espaços extras:**
   - Tokens começam com `sbp_`
   - Devem ter exatamente 40 caracteres após o prefixo

2. **Teste o token diretamente:**
   ```bash
   curl -H "Authorization: Bearer SEU_TOKEN" \
        https://api.supabase.com/v1/projects
   ```

3. **Confirme o project-ref:**
   - Deve ter 20 caracteres
   - Apenas letras minúsculas

### ❌ Claude responde mas não executa comandos Supabase

1. **Use comandos mais específicos:**
   ```
   "Use o MCP do Supabase para listar as tabelas"
   ```

2. **Verifique se o modo read-only está ativo:**
   - Comandos de criação podem falhar silenciosamente
   - Remova `--read-only` se quiser criar tabelas

### ❌ Erro no Windows

Se estiver no Windows, modifique o comando no .mcp.json:
```json
"command": "cmd",
"args": [
  "/c",
  "npx",
  "-y",
  "@supabase/mcp-server-supabase@latest",
  "--read-only",
  "--project-ref=SEU_PROJECT_REF"
]
```

## 🔍 Verificação Completa

Execute este checklist se algo não funcionar:

- [ ] Token Supabase começa com `sbp_`
- [ ] Project Reference tem 20 caracteres
- [ ] Arquivo `.mcp.json` está na raiz (não em /frontend)
- [ ] JSON tem vírgula após o bloco do GitHub
- [ ] Não há aspas simples, apenas duplas no JSON
- [ ] Claude Code foi completamente reiniciado
- [ ] Testou com comando específico do MCP

## 💡 Exemplo Prático Completo

Após configurar, aqui está um fluxo completo para preparar o XMXSystem:

```
Você: "Liste as tabelas do meu Supabase"
Claude: [mostra tabelas vazias ou existentes]

Você: "Crie uma tabela users com id UUID primary key, email text unique, 
       name text, role text default 'user', e created_at timestamp"
Claude: [cria a tabela]

Você: "Crie uma tabela sales com id serial primary key, user_id UUID 
       referenciando users(id), amount decimal, date date, status text, 
       e created_at timestamp"
Claude: [cria a tabela com foreign key]

Você: "Mostre o SQL para criar essas tabelas"
Claude: [mostra os comandos CREATE TABLE]

Você: "Insira 3 usuários de teste na tabela users"
Claude: [insere dados de exemplo]
```

## 🔐 Configuração Alternativa via CLI

Se preferir não editar arquivos manualmente:

```bash
# Na raiz do projeto XMXSystem
claude mcp add supabase -s local \
  -e SUPABASE_ACCESS_TOKEN=seu_token_aqui \
  -- npx -y @supabase/mcp-server-supabase@latest \
  --project-ref=seu_project_ref_aqui
```

## 📊 Integrando com o Frontend Next.js

Depois de configurar o MCP, você pode pedir ao Claude para:

1. **Gerar tipos TypeScript** baseados nas tabelas
2. **Criar funções de API** para o frontend
3. **Configurar Supabase Client** no projeto
4. **Implementar autenticação** com Supabase Auth

## 🚀 Comandos Úteis Rápidos

- `"Status do meu Supabase"` - Verifica conexão
- `"Tabelas do banco"` - Lista todas as tabelas
- `"Estrutura da tabela X"` - Mostra colunas e tipos
- `"Quantos registros tem na tabela Y"` - Conta registros
- `"SQL para criar índices nas foreign keys"` - Otimização

---

**Última atualização**: 05 de Agosto de 2025
**Guia específico para**: Projeto XMXSystem com Claude Code