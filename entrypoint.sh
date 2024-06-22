#!/bin/sh

if [ -f /my-space/.env.local ]; then
  export $(grep -v '^#' /my-space/.env.local | xargs)
fi

echo "Environment variables loaded:"
env | grep NEXT_PUBLIC

exec "$@"
