import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Stepper,
  StepperItem,
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
import { useSubmitForm } from "@/hooks/use-submit-form";
import { GraduationCap, Users, Sparkles, ArrowRight } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { currentStep, formData, setCurrentStep, updateFormData, resetForm } = useFormStore();
  const formContentAreaRef = useRef<HTMLDivElement>(null);

  const { mutate: submitForm, isPending: isSubmitting } = useSubmitForm();

  // Configuration des steps
  const steps = [
    {
      title: "Informations personnelles",
      description: "Vos données de base",
      icon: "👤",
      shortTitle: "Profil",
    },
    {
      title: "Centres d'intérêt",
      description: "Pour le matching",
      icon: "🎯",
      shortTitle: "Intérêts",
    },
    {
      title: "Préférences",
      description: "Type de parrainage",
      icon: "💭",
      shortTitle: "Préférences",
    },
    {
      title: "Photo de profil",
      description: "Finalisation",
      icon: "📸",
      shortTitle: "Photo",
    },
  ];

  // Handlers pour la navigation
  const handlePersonalInfoNext = (data: z.infer<typeof personalInfoSchema>) => {
    updateFormData(data);
    setCurrentStep(1);
    toast.success("Informations personnelles enregistrées !");
  };

  const handleMatchingNext = (data: z.infer<typeof matchingSchema>) => {
    updateFormData(data);
    setCurrentStep(2);
    toast.success("Centres d'intérêt enregistrés !");
  };

  const handlePreferencesNext = (data: z.infer<typeof preferencesSchema>) => {
    updateFormData(data);
    setCurrentStep(3);
    toast.success("Préférences enregistrées !");
  };

  const handlePhotoSubmit = (data: z.infer<typeof photoSchema>) => {
    const finalData = { ...formData, ...data } as CompleteFormData;

    submitForm(finalData, {
      onSuccess: () => {
        toast.success("Inscription soumise avec succès !");
        resetForm(); // Clear localStorage after successful submission
        navigate({ to: "/success", state: { from: "submission" } });
      },
      onError: (error: any) => {
        // Affiche le message d'erreur de l'API s'il existe, sinon un message générique
        const errorMessage =
          error.response?.data?.error ||
          "Une erreur inattendue est survenue. Veuillez réessayer.";
        toast.error(errorMessage);
        console.error("Erreur détaillée:", error);
      },
    });
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Auto-scroll to top when step changes
  useEffect(() => {
    // Double RAF to ensure layout is fully calculated after complex renders
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (formContentAreaRef.current) {
          formContentAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }, [currentStep]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Header mobile : Carte flottante sticky */}
      <div className="lg:hidden sticky top-2 z-50 mx-4 mb-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
          <div className="text-center mb-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Étape {currentStep + 1} sur {steps.length}
            </p>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
              {steps[currentStep].title}
            </h2>
          </div>

          <div className="flex justify-center">
            <Stepper
              value={currentStep}
              orientation="horizontal"
              className="mb-0"
            >
              {steps.map((step, index) => (
                <StepperItem
                  key={index}
                  step={index}
                  completed={currentStep > index}
                  className="flex-1"
                >
                  <StepperTrigger className="flex flex-col items-center gap-2 text-center p-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-md transition-all ${
                        currentStep >= index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-xs font-medium hidden sm:block text-primary">
                      {step.shortTitle}
                    </span>
                  </StepperTrigger>
                  {index < steps.length - 1 && (
                    <StepperSeparator className="bg-border" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>
      </div>

      {/* Sidebar desktop : Version améliorée */}
      <div className="hidden lg:flex lg:w-96 p-4 bg-primary flex-col relative overflow-hidden border-r-4 border-accent shadow-2xl lg:fixed lg:h-screen lg:top-0 lg:left-0">
        {/* Effet de background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-foreground/10 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary-foreground/10 rounded-full"></div>

        <div className="relative z-10">
          {/* Header principal desktop */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-primary-foreground rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  Programme MIAGE
                </h1>
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Parrainage L1</span>
                </div>
              </div>
            </div>

            {/* Message d'encouragement */}
            <div className="bg-primary-foreground/95 rounded-lg p-3 border-2 border-accent shadow-lg">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">
                  Trouvez votre parrain idéal
                </span>
              </div>
              <p className="text-foreground text-sm leading-relaxed">
                Quelques minutes pour vous connecter avec un étudiant senior qui
                vous guidera dans votre parcours MIAGE.
              </p>
            </div>
          </div>

          {/* Stepper vertical amélioré */}
          <Stepper
            value={currentStep}
            orientation="vertical"
            className="flex-1 mb-4"
          >
            {steps.map((step, index) => (
              <StepperItem
                key={index}
                step={index}
                completed={currentStep > index}
                className="pb-6"
              >
                <StepperTrigger className="flex items-start gap-4 text-left group">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 shadow-lg ${
                      currentStep === index
                        ? "bg-primary-foreground text-primary border-2 border-accent scale-110"
                        : currentStep > index
                          ? "bg-accent text-accent-foreground border-2 border-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-secondary"
                    }`}
                  >
                    {currentStep > index ? "✓" : step.icon}
                  </div>
                  <div className="flex-1">
                    <StepperTitle
                      className={`font-bold transition-colors ${
                        currentStep === index
                          ? "text-primary-foreground"
                          : "text-primary-foreground/90"
                      }`}
                    >
                      {step.title}
                    </StepperTitle>
                    <p
                      className={`text-sm mt-1 transition-colors ${
                        currentStep === index
                          ? "text-primary-foreground"
                          : "text-primary-foreground/80"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && (
                  <StepperSeparator className="ml-5 bg-primary-foreground/40" />
                )}
              </StepperItem>
            ))}
          </Stepper>

          {/* Progression desktop stylée */}
          <div className="bg-primary-foreground/95 rounded-xl p-3 border-2 border-accent shadow-lg">
            <div className="flex justify-between items-center text-primary mb-2">
              <span className="font-bold">Progression</span>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="bg-accent h-4 rounded-full transition-all duration-700 shadow-sm"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-foreground text-xs mt-1 font-medium">
              {currentStep + 1} sur {steps.length} étapes complétées
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal : Formulaires */}
      <div
        ref={formContentAreaRef}
        className="form-content-area flex-1 p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto flex justify-center bg-card lg:ml-96"
      >
        <div className="w-full max-w-4xl px-0 sm:px-2">
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
