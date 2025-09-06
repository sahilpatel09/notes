FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm@9.1.2

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Install additional polyfill packages
RUN pnpm add -w buffer stream-browserify util crypto-browserify

# Don't copy source code - it will be mounted as volumes in development
# COPY . .

EXPOSE 5006

# Use the dev:docker script for development mode with polling enabled
CMD ["pnpm", "run", "dev:docker"]
