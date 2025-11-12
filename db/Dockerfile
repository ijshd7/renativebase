FROM alpine:latest

ARG PB_VERSION=0.32.0

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    bash \
    curl

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/ && rm /tmp/pb.zip

# UNCOMMENT IF YOU HAVE MIGRATIONS IN POCKETBASE
# COPY ./pb_migrations /pb/pb_migrations

# UNCOMMENT IF YOU HAVE HOOKS IN POCKETBASE
# COPY ./pb_hooks /pb/pb_hooks

VOLUME /pb_data

EXPOSE 8090

# Startup script will upsert superuser before starting PocketBase
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
