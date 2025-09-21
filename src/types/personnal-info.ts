import { z } from "zod";

export const personalInfoSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenoms: z
    .string()
    .min(2, "Les prénoms doivent contenir au moins 2 caractères"),
  age: z.number().min(17, "Âge minimum 17 ans").max(25, "Âge maximum 25 ans"),
  annee: z.literal("L1"), // Fixé par défaut
  email: z.email("Email invalide"),
  telephone: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),
});
