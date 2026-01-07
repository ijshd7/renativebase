#!/bin/bash

# Default PocketBase version
PB_VERSION=${1:-0.35.0}

# Load env vars
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Check required variables
if [[ -z "$PB_SUPERUSER_EMAIL" || -z "$PB_SUPERUSER_PASSWORD" ]]; then
  echo "ERROR: PB_SUPERUSER_EMAIL and PB_SUPERUSER_PASSWORD must be set."
  exit 1
fi

# Set default port
PB_PORT=${PB_PORT:-8090}

# Determine OS and architecture
OS=$(uname | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

if [[ "$OS" == "darwin" ]]; then
    OS="darwin"
    if [[ "$ARCH" == "arm64" ]]; then
        ARCH="arm64"
    else
        ARCH="amd64"
    fi
elif [[ "$OS" == "linux" ]]; then
    if [[ "$ARCH" == "x86_64" ]]; then
        ARCH="amd64"
    fi
else
    echo "❌ Unsupported OS: $OS"
    exit 1
fi

# Download PocketBase
PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_${OS}_${ARCH}.zip"

echo "📦 Downloading PocketBase from: $PB_URL"
curl -L -o pb.zip "$PB_URL" || { echo "❌ Download failed"; exit 1; }

mkdir -p dest
unzip pb.zip -d dest || { echo "❌ Unzip failed"; rm -rf dest pb.zip; exit 1; }

mv dest/pocketbase ./pocketbase || { echo "❌ Move failed"; rm -rf dest pb.zip; exit 1; }
chmod +x ./pocketbase
rm -rf dest pb.zip

echo "✅ PocketBase v${PB_VERSION} downloaded and extracted to ./pocketbase"

# Check if PocketBase binary exists
if [ ! -f ./pocketbase ]; then
  echo "❌ PocketBase binary not found. Aborting."
  exit 1
fi

# Upsert superuser via CLI
echo "🛠️ Upserting superuser via CLI..."
./pocketbase superuser upsert "$PB_SUPERUSER_EMAIL" "$PB_SUPERUSER_PASSWORD"

# Start the server
echo "🚀 Starting PocketBase on port $PB_PORT..."
./pocketbase serve --http="0.0.0.0:$PB_PORT"