# Rissio — mémoire du projet

Source de vérité de l'avancement : [docs/ROADMAP.md](docs/ROADMAP.md).

## Projet

Logiciel de bureau open source pour prendre les statistiques d'un match de volley à partir de la vidéo :

1. Saisie MANUELLE ultra ergonomique : le minimum d'actions sans perdre en complétude des stats.
2. IA qui pré-remplit la saisie (découpage des rallyes, détection des touches, zones), validée par l'humain.
3. Site web qui lit les fichiers produits, calcule, affiche (match, saison, joueur) et partage les stats.

Nom : Rissio (nom de travail initial : LogiStats). Paquets : `@rissio/*`.

## Travailler avec Esteban

- Développeur Java (Eclipse RCP/SWT, architecture en couches), à l'aise en React, Node, Postgres/Supabase.
- Débutant-intermédiaire en IA : le projet sert à MONTER EN COMPÉTENCES en machine learning. Sur la piste IA, expliquer les concepts avant de coder, justifier les choix, dire quoi regarder dans les résultats.
- Machine : Mac M5 Max, 36 Go de RAM → PyTorch sur MPS, pas CUDA.
- Réponses en français, directes et concises. Code, identifiants et messages de commit en anglais ; documentation du dépôt en français.

## Contraintes non négociables

- Tout en open source. Hébergement local ou gratuit.
- Le logiciel doit être UTILE SANS l'IA : un accélérateur, jamais une condition.
- Licences des briques IA :
  - TrackNetV3 (MIT) : suivi du ballon.
  - RF-DETR, tailles Nano à Large (Apache 2.0) : détection des joueurs.
  - PAS Ultralytics YOLO (AGPL), sauf décision explicite d'Esteban.
  - hoangqnguyen/spot / VNL-STES (BSD-3) : détection d'événements.
  - Dataset VNL : entraînement uniquement, jamais redistribué.
- Aucune vidéo, aucun poids de modèle, aucun dataset dans git.
- Dépôt public : aucune donnée personnelle (joueurs, e-mails) dans git.

## Décisions d'architecture figées

Détail dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Ne pas les remettre en cause sans demander.

- Format : JSON d'événements bruts, versionné (`schemaVersion`), calqué sur DataVolley (codes d'action, évaluations `# + ! - / =`, zones, combinaisons), import/export `.dvw`. JAMAIS de stats calculées dans le fichier.
- Chaque événement pointe vers un `player_id` stable (effectif), jamais seulement un numéro de maillot.
- Une seule librairie de stats en TypeScript, partagée par le logiciel et le site.
- Bureau : Tauri + React. Analyse en Python, lancée à côté de l'interface ; entraînement PyTorch → export ONNX → ONNX Runtime (CoreML sur Mac, DirectML ou CUDA sur Windows, processeur sinon).
- Stockage local SQLite ; fonctionne sans compte.
- Builds Windows (.exe/.msi) et Mac (.dmg) via GitHub Actions ; GitHub Releases + mise à jour Tauri (clé USB possible).
- Site statique (Vercel ou Cloudflare Pages) : d'abord dépôt de fichiers sans compte, puis Supabase (auth + Postgres + RLS, région UE), sans serveur maison.
- Synchronisation à sens unique : le fichier local fait foi, « Publier » écrase la version en ligne.
- Vidéo en ligne : YouTube non répertorié, référencé par identifiant + décalage temporel.
- RGPD : page de confidentialité, suppression de compte et de données, affichage par numéro uniquement en option.

Toute nouvelle décision structurante → ADR courte dans `docs/adr/` (contexte, décision, alternatives écartées).

## Conventions

- Commits : conventional commits, en anglais. **Ne JAMAIS ajouter Claude en co-auteur (`Co-Authored-By`) ni mention « Generated with Claude ».**
- Identité git configurée localement au dépôt avec l'adresse `noreply` GitHub : ne pas la changer.
- TypeScript strict, pnpm workspaces, Vitest, ESLint, Prettier. Vérification complète : `pnpm check`.
- TypeScript est épinglé en 6.0 tant que `typescript-eslint` ne prend pas en charge la version 7.
- Python 3.12 dans `ml/`, géré par uv : `uv run ruff check .`, `uv run ruff format --check .`, `uv run pytest`.
- Demander avant d'installer un outil sur la machine.

## Protocole de session

Au début de chaque session :

- Lire CLAUDE.md, docs/ROADMAP.md et les dernières ADR.
- Résumer en 3 lignes où on en est.
- Proposer UNE étape : objectif, livrable, critère de fin vérifiable, ce qu'Esteban va apprendre (piste IA), estimation en soirées. S'il y a un choix de piste (appli ou IA), proposer les deux et le laisser trancher.
- Attendre son « go » avant de coder.

Pendant l'étape :

- Petits incréments testés. Si l'étape dépasse une session, la découper et le dire.
- Si une décision figée semble mauvaise, le signaler avec des arguments, mais ne pas la changer sans accord (puis ADR).
- Piste IA : expliquer avant de coder, commenter le code d'entraînement, chiffrer les résultats (précision, rappel, erreur en pixels) sur un jeu de test séparé, jamais sur les données d'entraînement.
- Code venant de PyTorch/CUDA : remplacer les `.cuda()` par un paramètre `device` (mps / cuda / cpu).

En fin d'étape :

- Vérifier le critère de fin et lancer les tests.
- Cocher l'étape dans docs/ROADMAP.md, ajouter 1 à 3 lignes de notes (fait, reste, pièges).
- Commit en conventional commits.
- Proposer l'étape suivante, sans la commencer.
