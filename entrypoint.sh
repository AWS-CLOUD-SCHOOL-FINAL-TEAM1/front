#!/bin/sh

echo "Starting entrypoint.sh"

# Load environment variables from .env.local
if [ -f /my-space/.env.local ]; then
  echo ".env.local file found. Loading environment variables..."
  set -o allexport
  source /my-space/.env.local
  set +o allexport
else
  echo ".env.local file not found."
fi

echo "Environment variables loaded:"
env | grep NEXT_PUBLIC

echo "Starting the application"
exec "$@"
