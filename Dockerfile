# Stage 1: Build the application
FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install

COPY . .

# Build the application with provided environment variables
ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_COGNITO_DOMAIN
ARG NEXT_PUBLIC_APP_CLIENT_ID
ARG NEXT_PUBLIC_APP_CLIENT_SECRET
ARG NEXT_PUBLIC_USER_POOL_ID
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_REDIRECT_SIGNIN
ARG NEXT_PUBLIC_REDIRECT_SIGNOUT

RUN NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY \
    NEXT_PUBLIC_COGNITO_DOMAIN=$NEXT_PUBLIC_COGNITO_DOMAIN \
    NEXT_PUBLIC_APP_CLIENT_ID=$NEXT_PUBLIC_APP_CLIENT_ID \
    NEXT_PUBLIC_APP_CLIENT_SECRET=$NEXT_PUBLIC_APP_CLIENT_SECRET \
    NEXT_PUBLIC_USER_POOL_ID=$NEXT_PUBLIC_USER_POOL_ID \
    NEXT_PUBLIC_AWS_REGION=$NEXT_PUBLIC_AWS_REGION \
    NEXT_PUBLIC_REDIRECT_SIGNIN=$NEXT_PUBLIC_REDIRECT_SIGNIN \
    NEXT_PUBLIC_REDIRECT_SIGNOUT=$NEXT_PUBLIC_REDIRECT_SIGNOUT \
    npm run build

# Stage 2: Run the application
FROM node:22-slim as runner

WORKDIR /my-space

COPY --from=builder /my-space/package.json ./
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next ./.next
COPY --from=builder /my-space/node_modules ./node_modules

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
