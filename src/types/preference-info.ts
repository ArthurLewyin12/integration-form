import { z } from "zod";

export const preferencesSchema = z.object({
  // Préférence genre parrain
  genreParrain: z.enum(["homme", "femme", "peu_importe"]),

  // Type de relation souhaitée
  typeRelation: z.enum([
    "mentor_academique", // Aide pour les cours
    "guide_social", // Intégration, événements
    "conseiller_carriere", // Orientation professionnelle
    "ami_senior", // Relation plus décontractée
  ]),

  // Fréquence de contact souhaitée
  frequenceContact: z.enum([
    "quotidien",
    "plusieurs_fois_semaine",
    "hebdomadaire",
    "selon_besoins",
  ]),

  // Mode de communication préféré
  modeCommunication: z.enum([
    "whatsapp",
    "rencontre_physique",
    "appels",
    "mixte",
  ]),

  // Commentaires
  commentaires: z.string().max(200).optional(),

  // Conditions
  accepteConditions: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter les conditions pour continuer",
    }),
});
