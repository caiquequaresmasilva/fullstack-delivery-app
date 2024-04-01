#!/usr/bin/env bash
# scripts/run-integration-tests.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh -t 5 "${POSTGRES_PRISMA_URL}" -- echo '🟢 - Database is ready!'
npm run set-db
jest -i integration
docker-compose down