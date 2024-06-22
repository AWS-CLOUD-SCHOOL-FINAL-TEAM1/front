#!/bin/sh

# Load environment variables from .env.local
if [ -f /my-space/.env.local ]; then
  set -o allexport
  source /my-space/.env.local
  set +o allexport
fi

exec "$@"
