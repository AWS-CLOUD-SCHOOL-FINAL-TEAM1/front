# Stage 1: Build the application
FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install

COPY . .

# 실제 환경 변수 값 설정
ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_COGNITO_DOMAIN
ARG NEXT_PUBLIC_APP_CLIENT_ID
ARG NEXT_PUBLIC_APP_CLIENT_SECRET
ARG NEXT_PUBLIC_USER_POOL_ID
ARG NEXT_PUBLIC_AWS_REGION
ARG NEXT_PUBLIC_REDIRECT_SIGNIN
ARG NEXT_PUBLIC_REDIRECT_SIGNOUT

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

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
