# Plan de Développement du Système de Matching Parrains-Filleuls

## 1. Objectif

Créer un service de matching automatisé pour attribuer à chaque nouvel étudiant ("filleul") un parrain, en optimisant la compatibilité des binômes tout en respectant des contraintes d'assignation spécifiques.

- **Contrainte 1 :** Un filleul doit avoir exactement un parrain.
- **Contrainte 2 :** Un parrain doit avoir au minimum 1 et au maximum 2 filleuls.

## 2. Choix Technologique

- **Langage :** **Rust**. Pour sa performance, sa sécurité (gestion de la mémoire, concurrence) et son écosystème.
- **Format d'échange de données :** **JSON**. Le service Rust exposera une API REST simple qui acceptera les listes de filleuls et de parrains en JSON et retournera les paires assignées en JSON.

## 3. Étapes de Développement

### Étape 1 : Modélisation des Données en Rust

- Définir les `structs` Rust correspondant aux profils des filleuls et des parrains, inspirées des schémas Zod existants.
- Utiliser la `crate` **`serde`** pour la sérialisation/désérialisation JSON.

```rust
// Exemple de structure
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Filleul {
    id: String,
    nom: String,
    hobbies: Vec<String>,
    style_apprentissage: String,
    attentes_parrainage: String, // Ajout pour l'IA
    // ... autres champs
}

#[derive(Serialize, Deserialize, Debug)]
struct Parrain {
    id: String,
    nom: String,
    hobbies: Vec<String>,
    style_apprentissage: String,
    description_parrain: String, // À ajouter au formulaire du parrain pour l'IA
    // ... autres champs
}
```

### Étape 2 : Implémentation de la Fonction de Score "Intelligente"

- Créer une fonction `calculate_compatibility(filleul: &Filleul, parrain: &Parrain) -> f64` qui retourne un score numérique de compatibilité.
- **Logique du score (approche mixte) :**
    1.  **Score Structuré (Logique simple) :**
        - Attribuer des points pour les correspondances sur les champs catégoriels (ex: `style_apprentissage`).
        - Calculer un score basé sur le nombre d'éléments en commun dans les listes (ex: `hobbies`, `specialisation_interesse`).
    2.  **Score Sémantique (IA) :**
        - Utiliser les champs de texte libre (`filleul.attentes_parrainage` et `parrain.description_parrain`).
        - **Option A (Recommandée pour démarrer) : Appel API externe.**
            - Faire un appel HTTP à une API de modèle de langage (ex: Google AI - Gemini, OpenAI).
            - Envoyer un prompt au modèle demandant un score de compatibilité (0-100) basé sur les textes.
            - Parser la réponse pour extraire le score.
        - **Option B (Plus complexe, mais autonome) : LLM local en Rust.**
            - Utiliser une `crate` Rust comme **`llm`** (ou `candle`, `llm-chain`) pour charger et exécuter un modèle de langage directement sur le serveur.
            - Envoyer les textes au modèle local et obtenir un score de compatibilité.
    3.  **Score Final :** Combiner les scores structurés et sémantiques avec des poids ajustables.
        `Score Final = (poids_structuré * score_structuré) + (poids_ia * score_ia)`

### Étape 3 : L'Algorithme d'Assignation (Heuristique en Deux Tours)

Cet algorithme utilisera la fonction de score "intelligente" pour trouver les meilleurs appariements en respectant les contraintes. Pour un nombre limité de filleuls/parrains (environ 70), cette heuristique est performante et suffisante.

1.  **Initialisation :**
    - Créer une liste de filleuls non assignés et une liste de parrains avec leur capacité restante (initialement 2).
    - Calculer et stocker tous les scores de compatibilité possibles pour chaque paire (filleul, parrain).

2.  **Tour 1 : Assurer le `min: 1` pour les parrains.**
    - Pour chaque parrain, identifier le meilleur filleul non assigné avec lequel il a le score le plus élevé.
    - Résoudre les conflits : si un filleul est le meilleur match pour plusieurs parrains, l'assigner au parrain avec qui il a le score le plus élevé.
    - Effectuer ces premières assignations. Mettre à jour la capacité des parrains et retirer les filleuls de la liste des non-assignés.

3.  **Tour 2 : Assigner les filleuls restants (`max: 2`).**
    - Pour chaque filleul restant, parcourir la liste des parrains qui ont encore de la capacité (`capacité == 1`).
    - Lui assigner le parrain avec le meilleur score de compatibilité.
    - Mettre à jour la capacité du parrain.

4.  **Finalisation :**
    - Retourner la liste des paires `(filleul_id, parrain_id)`.

### Étape 4 : Mise en Place du Service

- Créer un simple serveur web en Rust (avec **`actix-web`** ou **`axum`**) qui expose un endpoint, par exemple `/match`.
- Cet endpoint accepte une requête POST avec les données des filleuls et parrains en JSON.
- Il exécute l'algorithme de matching et retourne le résultat.
- Utiliser des variables d'environnement pour la configuration (clés d'API pour les embeddings, chemins des modèles locaux, etc.).

## 5. Évolution Possible (Post-MVP)

- Si l'heuristique montre ses limites ou si le nombre d'utilisateurs augmente considérablement, envisager l'intégration d'un véritable solveur d'optimisation (comme `Google OR-Tools` via un "wrapper" ou une implémentation Rust).
- Mettre en place une boucle de feedback pour que les utilisateurs puissent noter la qualité du matching, afin de collecter des données pour améliorer l'algorithme de score (et potentiellement entraîner un modèle d'IA plus spécifique).