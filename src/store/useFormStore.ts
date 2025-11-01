import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompleteFormData } from "@/types/complete-data";

interface FormStore {
  currentStep: number;
  formData: Partial<CompleteFormData>;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<CompleteFormData>) => void;
  updateFormData: (data: Partial<CompleteFormData>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      formData: {
        annee: "L1", // Valeur par défaut
      },
      setCurrentStep: (step) => set({ currentStep: step }),
      setFormData: (data) => set({ formData: data }),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () =>
        set({
          currentStep: 0,
          formData: { annee: "L1" },
        }),
    }),
    {
      name: "integration-form-storage", // nom unique pour localStorage
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
      }),
    },
  ),
);
