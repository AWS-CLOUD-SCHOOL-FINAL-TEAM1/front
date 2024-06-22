#!/bin/sh

# Load environment variables from .env.local
if [ -f /my-space/.env.local ]; then
  export $(grep -v '^#' /my-space/.env.local | xargs)
fi

# Log loaded environment variables for debugging
echo "Loaded environment variables:"
echo "NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY"
echo "NEXT_PUBLIC_COGNITO_DOMAIN=$NEXT_PUBLIC_COGNITO_DOMAIN"
echo "NEXT_PUBLIC_USER_POOL_ID=$NEXT_PUBLIC_USER_POOL_ID"
echo "NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION"
echo "NEXT_PUBLIC_APP_CLIENT_ID=$NEXT_PUBLIC_APP_CLIENT_ID"
echo "NEXT_PUBLIC_APP_CLIENT_SECRET=$NEXT_PUBLIC_APP_CLIENT_SECRET"
echo "NEXT_PUBLIC_REDIRECT_SIGNIN=$NEXT_PUBLIC_REDIRECT_SIGNIN"
echo "NEXT_PUBLIC_REDIRECT_SIGNOUT=$NEXT_PUBLIC_REDIRECT_SIGNOUT"

exec "$@"
