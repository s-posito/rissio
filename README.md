# Rissio

Logiciel de bureau open source pour prendre les statistiques d'un match de volley à partir de la vidéo.

> Projet en phase de cadrage : rien d'utilisable pour l'instant. Avancement : [docs/ROADMAP.md](docs/ROADMAP.md).

## Objectif

1. Une saisie manuelle très ergonomique : un minimum d'actions, des stats complètes.
2. Une IA optionnelle qui pré-remplit la saisie, que l'humain valide.
3. Un site web pour afficher et partager les stats.

Le logiciel doit être utile sans l'IA.

## Développement

Prérequis : Node 24+, pnpm, uv.

```sh
pnpm install
pnpm check

cd ml
uv sync
uv run ruff check . && uv run ruff format --check . && uv run pytest
```

## Documentation

- [Feuille de route](docs/ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md) et [décisions](docs/adr/README.md)
- [Filmer un match](docs/CAPTATION.md)
- [Stats cibles](docs/STATS_CIBLES.md)
- [Benchmark](docs/BENCHMARK.md)

## Licence

[Apache 2.0](LICENSE)
