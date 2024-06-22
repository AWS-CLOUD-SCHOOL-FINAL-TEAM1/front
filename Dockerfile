FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install

COPY . .

ARG API_KEY
ARG COGNITO_DOMAIN
ARG USER_POOL_ID
ARG AWS_REGION
ARG APP_CLIENT_ID
ARG APP_CLIENT_SECRET
ARG REDIRECT_SIGNIN
ARG REDIRECT_SIGNOUT

ENV NEXT_PUBLIC_API_KEY=$API_KEY
ENV NEXT_PUBLIC_COGNITO_DOMAIN=$COGNITO_DOMAIN
ENV NEXT_PUBLIC_USER_POOL_ID=$USER_POOL_ID
ENV NEXT_PUBLIC_AWS_REGION=$AWS_REGION
ENV NEXT_PUBLIC_APP_CLIENT_ID=$APP_CLIENT_ID
ENV NEXT_PUBLIC_APP_CLIENT_SECRET=$APP_CLIENT_SECRET
ENV NEXT_PUBLIC_REDIRECT_SIGNIN=$REDIRECT_SIGNIN
ENV NEXT_PUBLIC_REDIRECT_SIGNOUT=$REDIRECT_SIGNOUT

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

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
