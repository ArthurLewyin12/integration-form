import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/request";
import type { CompleteFormData } from "@/types/complete-data";

// Le type de données attendu par notre fonction de mutation
// On sépare la photo des autres champs pour la gestion du FormData
type SubmitPayload = Omit<CompleteFormData, "photo"> & {
  photo: File;
};

// La fonction qui envoie les données à l'API
const submitInscription = async (payload: SubmitPayload) => {
  const { photo, ...data } = payload;

  // L'URL de l'endpoint de l'API
  const SUBMIT_URL = "/submissions";

  return request.postWithFile<any>(SUBMIT_URL, data, photo);
};

// Le hook personnalisé
export const useSubmitForm = () => {
  return useMutation({
    mutationFn: submitInscription,
    onSuccess: (data) => {
      // Gérer le succès de la requête
      console.log("Inscription réussie !", data);
    },
    onError: (error) => {
      // Gérer les erreurs
      console.error("Erreur lors de l'inscription :", error);
    },
  });
};
