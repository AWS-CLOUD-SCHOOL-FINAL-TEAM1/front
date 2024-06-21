FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:22-slim as runner
WORKDIR /my-space
COPY --from=builder /my-space/package.json ./
COPY --from=builder /my-space/package-lock.json ./
COPY --from=builder /my-space/next.config.js ./
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next ./.next
COPY --from=builder /my-space/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]