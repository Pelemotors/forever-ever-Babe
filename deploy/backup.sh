#!/usr/bin/env bash
set -euo pipefail

stamp=$(date -u +%Y%m%dT%H%M%SZ)
target="/srv/backups/foreverandeverbabe/$stamp"
mkdir -m 700 "$target"
node -e 'const {DatabaseSync}=require("node:sqlite"); const db=new DatabaseSync("/srv/foreverandeverbabe/data/memories.sqlite"); db.prepare("VACUUM INTO ?").run(process.argv[1])' "$target/memories.sqlite"
tar -C /srv/foreverandeverbabe/data -czf "$target/uploads.tar.gz" uploads
sha256sum "$target/memories.sqlite" "$target/uploads.tar.gz" > "$target/SHA256SUMS"
