# Stage 1: Build the application
FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install

COPY . .

# 임시 환경 변수 설정
ARG NEXT_PUBLIC_API_KEY=http://temp-api-key
ARG NEXT_PUBLIC_COGNITO_DOMAIN=https://temp-cognito-domain
ARG NEXT_PUBLIC_APP_CLIENT_ID=temp-app-client-id
ARG NEXT_PUBLIC_APP_CLIENT_SECRET=temp-app-client-secret
ARG NEXT_PUBLIC_USER_POOL_ID=temp-user-pool-id
ARG NEXT_PUBLIC_AWS_REGION=temp-aws-region
ARG NEXT_PUBLIC_REDIRECT_SIGNIN=http://localhost:3000
ARG NEXT_PUBLIC_REDIRECT_SIGNOUT=http://localhost:3000

ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}
ENV NEXT_PUBLIC_COGNITO_DOMAIN=${NEXT_PUBLIC_COGNITO_DOMAIN}
ENV NEXT_PUBLIC_APP_CLIENT_ID=${NEXT_PUBLIC_APP_CLIENT_ID}
ENV NEXT_PUBLIC_APP_CLIENT_SECRET=${NEXT_PUBLIC_APP_CLIENT_SECRET}
ENV NEXT_PUBLIC_USER_POOL_ID=${NEXT_PUBLIC_USER_POOL_ID}
ENV NEXT_PUBLIC_AWS_REGION=${NEXT_PUBLIC_AWS_REGION}
ENV NEXT_PUBLIC_REDIRECT_SIGNIN=${NEXT_PUBLIC_REDIRECT_SIGNIN}
ENV NEXT_PUBLIC_REDIRECT_SIGNOUT=${NEXT_PUBLIC_REDIRECT_SIGNOUT}

RUN npm run build

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

COPY .env.local /my-space/.env.local

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
