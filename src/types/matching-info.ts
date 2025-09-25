import { z } from "zod";

export const matchingSchema = z.object({
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
    .min(1, { message: "Veuillez sélectionner au moins un centre d'intérêt." }),
  personnalite: z.enum(["extraverti", "introverti", "equilibre"], {
    message: "Veuillez sélectionner votre type de personnalité.",
  }),
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
    .min(1, {
      message: "Veuillez sélectionner au moins un domaine qui vous intéresse.",
    }),
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
    .min(1, {
      message: "Veuillez sélectionner au moins un objectif d'études.",
    }),
  styleApprentissage: z.enum(
    [
      "pratique_hands_on",
      "theorique_conceptuel",
      "groupe_collaboratif",
      "individuel_autonome",
    ],
    {
      message: "Veuillez sélectionner votre style d'apprentissage.",
    },
  ),
  niveauTechnique: z.enum(
    ["debutant", "quelques_bases", "intermediaire", "avance"],
    {
      message: "Veuillez sélectionner votre niveau technique.",
    },
  ),
  participationAsso: z.enum(
    ["tres_actif", "occasionnel", "observateur", "pas_interesse"],
    {
      message: "Veuillez indiquer votre niveau de participation associative.",
    },
  ),
  attentesParrainage: z
    .string()
    .min(1, "Veuillez décrire vos attentes.")
    .min(20, "Veuillez décrire vos attentes en 20 caractères minimum.")
    .max(300, "La description ne doit pas dépasser 300 caractères."),
});
