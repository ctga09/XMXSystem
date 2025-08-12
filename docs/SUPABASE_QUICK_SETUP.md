# 🚀 Supabase MCP - Setup Rápido (2 minutos)

Você já tem o token? Ótimo! Siga estes passos:

## 1️⃣ Pegue o Project Reference

1. Acesse: https://supabase.com/dashboard
2. Clique no seu projeto
3. Vá em **Settings** → **General**
4. Copie o **Reference ID** (20 caracteres)

## 2️⃣ Configure o arquivo .mcp.json

Abra `.mcp.json` e adicione o Supabase após o GitHub:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" // seu token atual
      }
    },
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=COLE_SEU_REF_AQUI"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "COLE_SEU_TOKEN_AQUI"
      }
    }
  }
}
```

⚠️ **Não esqueça a vírgula após o bloco do GitHub!**

## 3️⃣ Reinicie o Claude Code

1. **Salve** o arquivo (Cmd+S / Ctrl+S)
2. **Feche completamente** o Claude Code (Cmd+Q / Alt+F4)
3. **Abra novamente**

## 4️⃣ Teste

Digite no Claude Code:
```
"Liste as tabelas do meu Supabase"
```

✅ **Funcionou?** Você verá a lista de tabelas!
❌ **Não funcionou?** Veja o guia completo em `SUPABASE_MCP_SETUP.md`

---

**Dica**: Remova `--read-only` se quiser criar/modificar tabelas.