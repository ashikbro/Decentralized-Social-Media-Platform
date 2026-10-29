# Decentralized Social Media Platform

A privacy-first, local-first social core for owner-controlled posts.

## Current status

This repository currently provides an owner-scoped SQLite post store with
creation, search, feed filtering, and deletion. Blockchain identity,
distributed replication, and network APIs are not implemented yet; the local
ownership boundary is established before adding those higher-risk layers.

## Development

```sh
python -m venv .venv
.venv/bin/pip install pytest
PYTHONPATH=src .venv/bin/pytest
```
