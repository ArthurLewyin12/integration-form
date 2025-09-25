import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const photoSchema = z.object({
  photo: z
    .instanceof(File, { message: "Veuillez sélectionner un fichier." })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Le fichier ne doit pas dépasser 10 Mo.`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Le format du fichier doit être JPG, JPEG ou PNG.",
    ),
});
