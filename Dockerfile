# Stage 1: Build the application
FROM node:22-slim as builder

WORKDIR /my-space

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Build the Next.js application
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

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "start"]
