#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <path-to-json> <webhook-url>"
  echo "Example: $0 backend/tests/fixtures/cartpanda/order_paid_real_sanitized.json http://localhost:8000/webhook/cartpanda"
  exit 1
fi

JSON_FILE="$1"
WEBHOOK_URL="$2"

if [ ! -f "$JSON_FILE" ]; then
  echo "File not found: $JSON_FILE"
  exit 1
fi

echo "Posting $JSON_FILE to $WEBHOOK_URL"
HTTP_CODE=$(curl -sS -o /tmp/replay_response.json -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  --data-binary "@${JSON_FILE}" \
  "$WEBHOOK_URL")

echo "HTTP $HTTP_CODE"
echo "Response:"
cat /tmp/replay_response.json | jq . 2>/dev/null || cat /tmp/replay_response.json

rm -f /tmp/replay_response.json || true



