import { z } from "zod";

export const personalInfoSchema = z.object({
  nom: z
    .string()
    .min(1, { message: "Le nom est requis." })
    .min(2, { message: "Le nom doit faire au moins 2 caractères." }),
  prenoms: z
    .string()
    .min(1, { message: "Le prénom est requis." })
    .min(2, { message: "Le prénom doit faire au moins 2 caractères." }),
  age: z
    .number({
      error: (iss) => {
        if (iss.code === "invalid_type") {
          return "L'âge doit être un nombre.";
        }
        return "L'âge est requis.";
      },
    })
    .min(14, { message: "Vous devez avoir au moins 14 ans." })
    .max(25, { message: "Vous ne pouvez pas avoir plus de 25 ans." }),
  annee: z.literal("L1"), // Fixé par défaut
  email: z
    .string()
    .min(1, { message: "L'email est requis." })
    .email({ message: "Veuillez saisir une adresse email valide." }),
  telephone: z
    .string()
    .min(1, { message: "Le numéro de téléphone est requis." })
    .regex(/^[0-9]{10}$/, {
      message: "Le numéro de téléphone doit contenir 10 chiffres.",
    }),
});
