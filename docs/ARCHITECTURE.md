# Architecture

## Vue d'ensemble

```text
vidéo ──> apps/desktop ──> fichier JSON d'événements ──> apps/web
             │    │                 │                       │
        SQLite  analyzer       packages/format         YouTube, Supabase
                (optionnel)         │
                              packages/stats (partagée par desktop et web)
```

`ml/` entraîne les modèles et les exporte en ONNX pour `analyzer/`.

## Dossiers

| Dossier           | Rôle                                                       | Phase |
| ----------------- | ---------------------------------------------------------- | ----- |
| `packages/format` | Types, JSON Schema, validation, import/export `.dvw`       | 1     |
| `packages/stats`  | Calcul des stats                                           | 1     |
| `apps/desktop`    | Logiciel de saisie Tauri + React                           | 2     |
| `apps/web`        | Site statique                                              | 3     |
| `supabase`        | Migrations                                                 | 3     |
| `ml`              | Entraînement, notebooks, évaluation (Python, uv)           | 4     |
| `analyzer`        | Analyse embarquée dans le logiciel                         | 4     |
| `data`            | Vidéos, annotations, poids ; local uniquement, hors de git | —     |

`packages/stats` dépend de `packages/format`, jamais l'inverse. Les paquets ne dépendent ni de Tauri ni du navigateur.

## Décisions figées

### Données

- JSON d'événements bruts, versionné par `schemaVersion`, calqué sur le modèle DataVolley : codes d'action, évaluations `# + ! - / =`, zones, combinaisons.
- Import et export `.dvw`.
- Le fichier ne contient jamais de stats calculées.
- Chaque événement pointe vers un `player_id` stable de l'effectif, jamais seulement vers un numéro de maillot.
- Une seule librairie de stats, en TypeScript.

### Logiciel

- Tauri + React, stockage SQLite, utilisable sans compte.
- Analyse Python lancée à côté de l'interface. Modèles entraînés en PyTorch, exportés en ONNX, exécutés avec ONNX Runtime : CoreML sur Mac, DirectML ou CUDA sur Windows, processeur sinon.
- Builds Windows (.exe/.msi) et Mac (.dmg) via GitHub Actions ; GitHub Releases et mise à jour Tauri, clé USB possible.

### Site

- Statique (Vercel ou Cloudflare Pages) : d'abord le dépôt de fichiers sans compte, puis Supabase (auth, Postgres, RLS, région UE), sans serveur maison.
- Synchronisation à sens unique : le fichier local fait foi, « Publier » écrase la version en ligne.
- Vidéo : YouTube non répertorié, référencé par identifiant + décalage temporel.
- RGPD : page de confidentialité, suppression de compte et de données, option d'affichage par numéro uniquement.

Les nouvelles décisions sont consignées dans [adr/](adr/README.md).
