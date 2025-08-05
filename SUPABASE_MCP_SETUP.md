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

## 🔑 Passo 1: Criar Token de Acesso Pessoal do Supabase

1. Acesse https://supabase.com/dashboard/account/tokens
2. Clique em **"Generate new token"**
3. Dê um nome descritivo: `Claude Code MCP - XMXSystem`
4. Clique em **"Generate token"**
5. **IMPORTANTE**: Copie o token gerado (você não verá ele novamente!)

## 🔍 Passo 2: Obter o Project Reference

1. Acesse seu projeto no Supabase Dashboard
2. Vá em **Settings** → **General**
3. Copie o **Reference ID** (algo como: `abcdefghijklmnop`)

## ⚙️ Passo 3: Configurar o MCP no Projeto

### Opção A: Configuração via arquivo .mcp.json (Recomendado)

1. Verifique se já existe um `.mcp.json` no projeto:
   ```bash
   cat .mcp.json
   ```

2. Se existir, atualize-o. Se não, crie um novo arquivo `.mcp.json` na raiz do projeto:

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
        "GITHUB_PERSONAL_ACCESS_TOKEN": "seu_token_github_aqui"
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=SEU_PROJECT_REF_AQUI"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "SEU_TOKEN_SUPABASE_AQUI"
      }
    }
  }
}
```

3. Substitua:
   - `SEU_PROJECT_REF_AQUI` pelo Reference ID do seu projeto
   - `SEU_TOKEN_SUPABASE_AQUI` pelo token que você criou
   - Mantenha a configuração do GitHub se já estiver funcionando

### Opção B: Configuração via CLI (Alternativa)

Execute no terminal na raiz do projeto:

```bash
claude mcp add supabase -s local -e SUPABASE_ACCESS_TOKEN=seu_token_aqui -- npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=seu_project_ref_aqui
```

## 🔒 Passo 4: Segurança

1. **IMPORTANTE**: O arquivo `.mcp.json` contém tokens sensíveis!
   - Ele já está no `.gitignore`, então não será commitado
   - Nunca compartilhe este arquivo

2. **Recomendações de segurança**:
   - Use `--read-only` para evitar modificações acidentais
   - Use um projeto de desenvolvimento, não produção
   - Crie um projeto Supabase separado para testes se necessário

## 🚀 Passo 5: Reiniciar Claude Code

1. Feche completamente o Claude Code
2. Abra novamente
3. O servidor MCP do Supabase deve estar disponível

## ✅ Passo 6: Verificar a Instalação

No Claude Code, você pode testar com comandos como:

- "Liste as tabelas do meu banco de dados Supabase"
- "Mostre a configuração do meu projeto Supabase"
- "Qual é a URL da minha API Supabase?"

## 🛠️ Comandos Disponíveis

Com o MCP configurado, você pode pedir ao Claude Code para:

### Gerenciamento de Banco de Dados
- Criar tabelas
- Listar tabelas existentes
- Executar queries SQL (em modo read-only)
- Ver estrutura de tabelas

### Configurações do Projeto
- Obter URLs da API
- Ver configurações de autenticação
- Listar Edge Functions

### Exemplo de Uso
```
"Crie uma tabela chamada 'products' com campos id, name, price e created_at no Supabase"
"Liste todas as tabelas do meu banco de dados"
"Mostre a estrutura da tabela users"
```

## 🐛 Troubleshooting

### Erro: "MCP server not found"
- Verifique se reiniciou o Claude Code após configurar
- Confirme que o arquivo `.mcp.json` está na raiz do projeto

### Erro: "Authentication failed"
- Verifique se o token está correto
- Confirme que o token não expirou
- Verifique se o project-ref está correto

### Erro no Windows
No Windows nativo (não WSL), use o wrapper `cmd /c`:
```bash
claude mcp add supabase -- cmd /c npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=seu_ref
```

## 📚 Recursos Adicionais

- [Documentação oficial do Supabase MCP](https://supabase.com/docs/guides/getting-started/mcp)
- [GitHub do projeto](https://github.com/supabase-community/supabase-mcp)
- [NPM Package](https://www.npmjs.com/package/@supabase/mcp-server-supabase)

## 🎉 Próximos Passos

Após configurar, você pode:

1. Criar o esquema do banco de dados para o XMXSystem
2. Configurar autenticação com Supabase Auth
3. Integrar o frontend com a API do Supabase
4. Usar o Claude Code para gerenciar tudo via linguagem natural!

---

**Última atualização**: 05 de Agosto de 2025