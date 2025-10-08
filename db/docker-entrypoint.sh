#!/bin/bash
set -e

PB_PORT=${PB_PORT:-8090}
PB_DATA_DIR=/pb_data
PB_MIGRATIONS_DIR=/pb/pb_migrations

mkdir -p "$PB_DATA_DIR"

if [ -d "$PB_MIGRATIONS_DIR" ]; then
  echo "📦 Running PocketBase migrations..."
  /pb/pocketbase migrate up --dir="$PB_DATA_DIR" --migrationsDir="$PB_MIGRATIONS_DIR"
fi

if [[ -n "$PB_SUPERUSER_EMAIL" && -n "$PB_SUPERUSER_PASSWORD" ]]; then
  echo "🛠️  Upserting PocketBase superuser..."
  /pb/pocketbase --dir="$PB_DATA_DIR" superuser upsert "$PB_SUPERUSER_EMAIL" "$PB_SUPERUSER_PASSWORD"
fi

echo "🚀 Starting PocketBase on port $PB_PORT..."
exec /pb/pocketbase serve --http="0.0.0.0:$PB_PORT" --dir="$PB_DATA_DIR"
