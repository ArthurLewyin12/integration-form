import { z } from "zod";

export const preferencesSchema = z.object({
  // Préférence genre parrain
  genreParrain: z.enum(["homme", "femme", "peu_importe"], {
    message: "Veuillez indiquer votre préférence de genre pour le parrain.",
  }),
  // Type de relation souhaitée
  typeRelation: z.enum(
    [
      "mentor_academique", // Aide pour les cours
      "guide_social", // Intégration, événements
      "conseiller_carriere", // Orientation professionnelle
      "ami_senior", // Relation plus décontractée
    ],
    {
      message: "Veuillez sélectionner le type de relation que vous souhaitez.",
    },
  ),
  // Fréquence de contact souhaitée
  frequenceContact: z.enum(
    ["quotidien", "plusieurs_fois_semaine", "hebdomadaire", "selon_besoins"],
    {
      message: "Veuillez indiquer la fréquence de contact souhaitée.",
    },
  ),
  // Mode de communication préféré
  modeCommunication: z.enum(
    ["whatsapp", "rencontre_physique", "appels", "mixte"],
    {
      message: "Veuillez choisir un mode de communication.",
    },
  ),
  // Commentaires
  commentaires: z
    .string()
    .max(200, "Le commentaire ne doit pas dépasser 200 caractères.")
    .optional(),
  // Conditions
  accepteConditions: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions pour continuer.",
  }),
});
