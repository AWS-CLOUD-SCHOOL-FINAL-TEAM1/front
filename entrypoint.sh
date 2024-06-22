#!/bin/sh

# Load environment variables from .env.local
if [ -f /my-space/.env.local ]; then
  set -o allexport
  . /my-space/.env.local
  set +o allexport
fi

echo "Environment variables loaded:"
env | grep NEXT_PUBLIC

exec "$@"
