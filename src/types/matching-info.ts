import { z } from "zod";

export const matchingSchema = z.object({
  // Centres d'intérêt
  hobbies: z
    .array(
      z.enum([
        "sport",
        "football",
        "basketball",
        "tennis",
        "musique",
        "lecture",
        "gaming",
        "cinema",
        "technologie",
        "programmation",
        "design",
        "entrepreneuriat",
        "voyage",
        "cuisine",
      ]),
    )
    .min(1, "Sélectionnez au moins un centre d'intérêt"),

  // Type de personnalité
  personnalite: z.enum(["extraverti", "introverti", "equilibre"]),

  // Domaines d'intérêt en MIAGE
  specialisationInteresse: z
    .array(
      z.enum([
        "developpement_web",
        "mobile",
        "data_science",
        "cybersecurite",
        "ia",
        "gestion_projet",
        "systemes_information",
        "reseaux",
      ]),
    )
    .min(1, "Sélectionnez au moins un domaine"),

  // Objectifs académiques
  objectifsEtudes: z
    .array(
      z.enum([
        "avoir_mention",
        "faire_stage_entreprise",
        "projet_perso",
        "bouger ailleurs",
        "creation_startup",
        "certification_tech",
        "competition_programmation",
      ]),
    )
    .min(1, "Sélectionnez au moins un objectif"),

  // Style d'apprentissage
  styleApprentissage: z.enum([
    "pratique_hands_on",
    "theorique_conceptuel",
    "groupe_collaboratif",
    "individuel_autonome",
  ]),

  // Niveau technique actuel
  niveauTechnique: z.enum([
    "debutant",
    "quelques_bases",
    "intermediaire",
    "avance",
  ]),

  // Participation associative
  participationAsso: z.enum([
    "tres_actif",
    "occasionnel",
    "observateur",
    "pas_interesse",
  ]),

  // Attentes du parrainage
  attentesParrainage: z
    .string()
    .min(20, "Décrivez vos attentes (minimum 20 caractères)")
    .max(300, "Maximum 300 caractères"),
});
