# ml

Entraînement, notebooks et scripts d'évaluation (phase 4). Les données et les poids vont dans `data/`, hors de git.

```sh
uv sync
uv run ruff check . && uv run ruff format --check . && uv run pytest
```

PyTorch sera ajouté à l'étape 4.1.
