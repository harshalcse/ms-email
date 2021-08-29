#!/bin/sh

if [ -z "$VAULT_BASE_URI" ]; then
  echo "Error: VAULT_BASE_URL env var is needed"
  exit 1
fi

if [ -z "$VAULT_TOKEN" ]; then
  echo "Error: VAULT_TOKEN env var is needed"
  exit 1
fi

if [ -z "$NODE_ENV" ]; then
  echo "Error: NODE_ENV env var is needed"
  exit 1
fi

if [ -z "$MS_NAME" ]; then
  echo "Error: MS_NAME env var is needed"
  exit 1
fi

GLOBAL_ENVVARS=$(wget --no-check-certificate -O - "$VAULT_BASE_URI/v1/kv/data/$NODE_ENV/global" --header "X-Vault-Token: $VAULT_TOKEN" | jq -r '.data.data | keys[] as $key | "export \($key)=\(.[$key])"')
eval $GLOBAL_ENVVARS

MS_ENVVARS=$(wget --no-check-certificate -O - "$VAULT_BASE_URI/v1/kv/data/$NODE_ENV/ms/$MS_NAME" --header "X-Vault-Token: $VAULT_TOKEN" | jq -r '.data.data | keys[] as $key | "export \($key)=\(.[$key])"')
eval $MS_ENVVARS

exec "$@"
