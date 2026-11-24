# Feuille de route

Source de vérité de l'avancement. À la fin d'une étape : cocher, puis ajouter 1 à 3 lignes de notes.

**Dépendances** : la phase 1 précède les phases 2 et 3. La piste 4.1 à 4.4 ne dépend que des vidéos ; on peut alterner une session appli et une session IA. Seule l'étape 4.5 attend le logiciel de saisie.

## Mise en place

- [x] Dépôt, outillage et documentation de pilotage
  - Notes : TypeScript épinglé en 6.0 (`typescript-eslint` ne prend pas encore en charge la 7). Rust et ffmpeg non installés : prévus en 2.1 et 4.1.

## Phase 0 — Cadrage (surtout côté Esteban)

- [ ] 0.1 Tester ovscout2 (openvolley, R/Shiny) et l'essai de Balltime → [BENCHMARK.md](BENCHMARK.md) : ce qui est bien, ce qui est pénible, ce que Rissio fera mieux.
- [ ] 0.2 Lister les stats cibles → [STATS_CIBLES.md](STATS_CIBLES.md) (par joueur, par rotation, side-out, attaque par zone, etc.).
- [ ] 0.3 Filmer 2-3 matchs selon [CAPTATION.md](CAPTATION.md) : caméra fixe, en hauteur, derrière la ligne de fond, terrain entier visible, 50/60 images par seconde.

## Phase 1 — Fondations sans interface

- [ ] 1.1 Spécifier le format d'événements → `docs/FORMAT.md` + JSON Schema + types TypeScript. ÉTAPE STRUCTURANTE : proposition, puis validation AVANT tout code qui en dépend.
- [ ] 1.2 Import/export `.dvw`, testés sur les fichiers d'exemple d'openvolley.
- [ ] 1.3 Librairie de stats TypeScript avec tests ; validation des résultats contre openvolley (datavolley en R, ou openvolley-pydatavolley en Python) sur les mêmes fichiers.

## Phase 2 — Logiciel de saisie manuelle

- [ ] 2.1 Squelette Tauri + React, et tout de suite la CI GitHub Actions qui compile pour Windows et Mac.
- [ ] 2.2 RISQUE À LEVER EN PREMIER : le lecteur vidéo dans la webview de Tauri (avancer image par image, saut précis, codecs courants sur Windows et Mac). Plan B documenté si ça échoue.
- [ ] 2.3 Calibration du terrain (clic sur les 4 coins → homographie → coordonnées terrain).
- [ ] 2.4 Saisie ergonomique : codes clavier, clic sur le terrain, enchaînements prédits par la grammaire du volley.
- [ ] 2.5 SQLite local, gestion des effectifs, export JSON et `.dvw`.
- [ ] 2.6 Utilisation sur de vrais matchs, corrections d'ergonomie. Chaque match saisi devient un jeu de données annoté.

## Phase 3 — Site web et partage

- [ ] 3.1 Site statique : dépôt de fichiers, stats et graphiques (via la librairie partagée).
- [ ] 3.2 Lecture YouTube intégrée : cliquer sur une stat → voir l'action.
- [ ] 3.3 Supabase : comptes, équipes, effectifs, RLS, bouton « Publier » dans le logiciel.
- [ ] 3.4 Vues multi-matchs : totaux de saison, évolution, comparaisons.

## Phase 4 — IA (piste parallèle, possible dès qu'il y a des vidéos)

- [ ] 4.1 TrackNetV3 tel quel sur les vidéos d'Esteban (backend MPS) → référence de précision mesurée.
- [ ] 4.2 Outil d'annotation du ballon (CSV : Frame, Visibility, X, Y), annotation des images, fine-tuning, comparaison avant/après sur un jeu de test séparé. POINT DE DÉCISION : si la précision est insuffisante, l'IA se limite au découpage des rallyes.
- [ ] 4.3 Découpage automatique des rallyes.
- [ ] 4.4 Détection des touches (changements de trajectoire + grammaire du volley) et position sur le terrain.
- [ ] 4.5 Export ONNX, intégration dans le logiciel en pré-remplissage ; évaluer l'inférence en Rust (crate `ort`) plutôt que d'embarquer Python.
- [ ] 4.6 Plus tard : entraîner STES (repo spot) sur le dataset VNL puis sur les matchs saisis ; identification automatique des joueurs.
