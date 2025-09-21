import { z } from "zod";

import { personalInfoSchema } from "./personnal-info";
import { matchingSchema } from "./matching-info";
import { preferencesSchema } from "./preference-info";
import { photoSchema } from "./profile-image";

export type CompleteFormData = z.infer<typeof personalInfoSchema> &
  z.infer<typeof matchingSchema> &
  z.infer<typeof preferencesSchema> &
  z.infer<typeof photoSchema>;
