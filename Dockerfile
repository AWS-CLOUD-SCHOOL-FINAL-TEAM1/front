FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_COGNITO_DOMAIN
ARG NEXT_PUBLIC_APP_CLIENT_ID
ARG NEXT_PUBLIC_APP_CLIENT_SECRET
ARG NEXT_PUBLIC_USER_POOL_ID
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_REDIRECT_SIGNIN
ARG NEXT_PUBLIC_REDIRECT_SIGNOUT

ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY:-http://temp-api-key}
ENV NEXT_PUBLIC_COGNITO_DOMAIN=${NEXT_PUBLIC_COGNITO_DOMAIN:-https://temp-cognito-domain}
ENV NEXT_PUBLIC_APP_CLIENT_ID=${NEXT_PUBLIC_APP_CLIENT_ID:-temp-app-client-id}
ENV NEXT_PUBLIC_APP_CLIENT_SECRET=${NEXT_PUBLIC_APP_CLIENT_SECRET:-temp-app-client-secret}
ENV NEXT_PUBLIC_USER_POOL_ID=${NEXT_PUBLIC_USER_POOL_ID:-temp-user-pool-id}
ENV NEXT_PUBLIC_AWS_REGION=${NEXT_PUBLIC_AWS_REGION:-temp-aws-region}
ENV NEXT_PUBLIC_REDIRECT_SIGNIN=${NEXT_PUBLIC_REDIRECT_SIGNIN:-http://localhost:3000}
ENV NEXT_PUBLIC_REDIRECT_SIGNOUT=${NEXT_PUBLIC_REDIRECT_SIGNOUT:-http://localhost:3000}

RUN npm run build

FROM node:22-slim as runner

WORKDIR /my-space

COPY --from=builder /my-space/package.json ./
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next ./.next
COPY --from=builder /my-space/node_modules ./node_modules

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN touch /my-space/.env.local

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
