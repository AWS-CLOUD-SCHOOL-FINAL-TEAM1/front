#!/bin/sh

# Load environment variables from .env.local
if [ -f /my-space/.env.local ]; then
  export $(grep -v '^#' /my-space/.env.local | xargs)
fi

exec "$@"
