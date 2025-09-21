import { z } from "zod";

export const preferencesSchema = z.object({
  // Préférence genre parrain
  genre_parrain: z.enum(["homme", "femme", "peu_importe"]),

  // Type de relation souhaitée
  type_relation: z.enum([
    "mentor_academique", // Aide pour les cours
    "guide_social", // Intégration, événements
    "conseiller_carriere", // Orientation professionnelle
    "ami_senior", // Relation plus décontractée
  ]),

  // Fréquence de contact souhaitée
  frequence_contact: z.enum([
    "quotidien",
    "plusieurs_fois_semaine",
    "hebdomadaire",
    "selon_besoins",
  ]),

  // Mode de communication préféré
  mode_communication: z.enum([
    "whatsapp",
    "rencontre_physique",
    "appels",
    "mixte",
  ]),

  // Commentaires
  commentaires: z.string().max(200).optional(),

  // Conditions
  accepte_conditions: z.literal(true),
});
