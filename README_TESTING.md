## Teste local do webhook CartPanda (replay de venda real)

Este guia descreve como reproduzir localmente um `order.paid` da CartPanda usando uma fixture sanitizada, validando USD/FX e idempotência.

### Pré-requisitos
- Backend configurado com `SUPABASE_URL` e `SUPABASE_KEY` apontando para o mesmo Supabase real.
- `ENVIRONMENT=development` para pular a verificação de assinatura.
- `jq` instalado (opcional, apenas para formatar a resposta no shell).

### Subir o backend
```bash
cd backend
ENVIRONMENT=development uvicorn app.main:app --reload --port 8000
```

### Reproduzir o webhook (1ª execução)
```bash
bash scripts/replay_cartpanda_webhook.sh backend/tests/fixtures/cartpanda/order_paid_real_sanitized.json http://localhost:8000/webhook/cartpanda
```
Resultado esperado:
- Registro inserido em `public.sales` com `cartpanda_id = CP_<novo order.id>`.
- Campos preenchidos: `amount_brl`, `amount_usd`, `fx_rate_brl_usd`, `fx_at`, `fx_source`, `payment_currency`.

### Reproduzir novamente (idempotência)
Execute o mesmo comando acima, sem alterar o JSON.

Resultado esperado:
- Nenhuma duplicação de venda.
- Não recomputar `amount_usd`/`fx_rate_brl_usd` para o mesmo `cartpanda_id`.

### Conferir no Supabase
- Verifique o registro criado em `public.sales` com o `cartpanda_id` correspondente.
- Cheque as casas decimais: `amount_brl/amount_usd` (2 casas), `fx_rate_brl_usd` (6 casas).

### Checar a UI
- Suba o frontend e acesse `/sales`.
- Deve exibir USD quando `amount_usd` existir; caso contrário, BRL.

### Observações
- A fixture é baseada em um webhook real, com PII sanitizada e `order.id` alterado para evitar colisão.
- Se desejar assinatura real, crie um script alternativo que assine o corpo com o segredo e ajuste `ENVIRONMENT`.



