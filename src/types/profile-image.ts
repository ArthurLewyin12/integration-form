import { z } from "zod";

export const photoSchema = z.object({
  photo: z
    .instanceof(File, { message: "Veuillez sélectionner une photo" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "La photo doit faire moins de 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Format accepté: JPG, JPEG, PNG uniquement",
    ),
});
