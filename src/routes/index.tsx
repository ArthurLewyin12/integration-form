import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperTrigger,
  StepperSeparator,
} from "@/components/ui/stepper";
import PersonalInfoForm from "@/components/forms/personnal-info-step";
import MatchingInfoForm from "@/components/forms/matching-info-step";
import PreferencesForm from "@/components/forms/preference-info-step";
import PhotoUploadForm from "@/components/forms/image-step";
import type { CompleteFormData } from "@/types/complete-data";
import { personalInfoSchema } from "@/types/personnal-info";
import { matchingSchema } from "@/types/matching-info";
import { preferencesSchema } from "@/types/preference-info";
import { photoSchema } from "@/types/profile-image";
import { z } from "zod";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CompleteFormData>>({
    annee: "L1", // Valeur par défaut
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration des steps
  const steps = [
    {
      title: "Informations personnelles",
      description: "Vos données de base",
    },
    {
      title: "Centres d'intérêt",
      description: "Pour le matching",
    },
    {
      title: "Préférences",
      description: "Type de parrainage",
    },
    {
      title: "Photo de profil",
      description: "Finalisation",
    },
  ];

  // Handlers pour la navigation
  const handlePersonalInfoNext = (data: z.infer<typeof personalInfoSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(1);
    toast.success("Informations personnelles enregistrées !");
  };

  const handleMatchingNext = (data: z.infer<typeof matchingSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
    toast.success("Centres d'intérêt enregistrés !");
  };

  const handlePreferencesNext = (data: z.infer<typeof preferencesSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
    toast.success("Préférences enregistrées !");
  };

  const handlePhotoSubmit = async (data: z.infer<typeof photoSchema>) => {
    setIsSubmitting(true);
    const finalData = { ...formData, ...data };

    try {
      // Simulation d'envoi au backend
      console.log("Données complètes à envoyer :", finalData);

      // Ici tu peux faire ton appel API
      // const response = await api.submitInscription(finalData);

      // Simulation d'attente
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        "Inscription soumise avec succès ! Vous recevrez bientôt des nouvelles de votre parrain.",
      );

      // Reset du formulaire
      setFormData({ annee: "L1" });
      setCurrentStep(0);
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      console.error("Erreur :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Header mobile : Stepper horizontal */}
      <div className="lg:hidden bg-gradient-to-r from-orange-50 to-orange-100 p-2">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">Inscription L1</h1>
          <p className="text-sm text-gray-600">Programme de parrainage MIAGE</p>
        </div>

        <Stepper value={currentStep} orientation="horizontal" className="mb-4">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index}
              completed={currentStep > index}
              className="flex-1"
            >
              <StepperTrigger className="flex flex-col items-center gap-2 text-center p-2">
                <StepperIndicator />
                <div className="hidden sm:block">
                  <StepperTitle className="font-medium text-gray-900 text-xs">
                    {step.title}
                  </StepperTitle>
                </div>
              </StepperTrigger>
              {index < steps.length - 1 && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>

        {/* Progression mobile */}
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Sidebar desktop : Stepper vertical */}
      <div className="hidden lg:flex lg:w-96 p-6 bg-gradient-to-br from-orange-50 to-orange-100 flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Inscription L1
          </h1>
          <p className="text-gray-600">Programme de parrainage MIAGE</p>
        </div>

        <Stepper value={currentStep} orientation="vertical" className="flex-1">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index}
              completed={currentStep > index}
              className="pb-8"
            >
              <StepperTrigger className="flex items-start gap-4 text-left">
                <StepperIndicator />
                <div>
                  <StepperTitle className="font-medium text-gray-900">
                    {step.title}
                  </StepperTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {step.description}
                  </p>
                </div>
              </StepperTrigger>
              {index < steps.length - 1 && (
                <StepperSeparator className="ml-3" />
              )}
            </StepperItem>
          ))}
        </Stepper>

        {/* Progression desktop */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Contenu principal : Formulaires */}
      <div className="flex-1 p-4 sm:p-6 lg:p-6 overflow-y-auto flex justify-center">
        <div className="w-full max-w-3xl">
          {currentStep === 0 && (
            <PersonalInfoForm
              onNext={handlePersonalInfoNext}
              initialData={formData}
            />
          )}

          {currentStep === 1 && (
            <MatchingInfoForm
              onNext={handleMatchingNext}
              onPrev={goToPreviousStep}
              initialData={formData}
            />
          )}

          {currentStep === 2 && (
            <PreferencesForm
              onNext={handlePreferencesNext}
              onPrev={goToPreviousStep}
              initialData={formData}
            />
          )}

          {currentStep === 3 && (
            <PhotoUploadForm
              onSubmit={handlePhotoSubmit}
              onPrev={goToPreviousStep}
              initialData={formData}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
