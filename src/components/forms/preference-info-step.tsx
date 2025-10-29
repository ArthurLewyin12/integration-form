"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Heart,
  Calendar,
  MessageCircle,
  FileText,
  Shield,
} from "lucide-react";
import { preferencesSchema } from "@/types/preference-info";

type PreferencesData = z.infer<typeof preferencesSchema>;

interface PreferencesFormProps {
  onNext: (data: PreferencesData) => void;
  onPrev: () => void;
  initialData?: Partial<PreferencesData>;
}

const genreParrainOptions = [
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "peu_importe", label: "Peu importe" },
];

const typeRelationOptions = [
  {
    value: "mentor_academique",
    label: "Mentor académique",
    description: "Aide pour les cours et études",
  },
  {
    value: "guide_social",
    label: "Guide social",
    description: "Intégration et événements",
  },
  {
    value: "conseiller_carriere",
    label: "Conseiller carrière",
    description: "Orientation professionnelle",
  },
  {
    value: "ami_senior",
    label: "Ami senior",
    description: "Relation décontractée",
  },
];

const frequenceContactOptions = [
  { value: "quotidien", label: "Quotidien" },
  {
    value: "plusieurs_fois_semaine",
    label: "Plusieurs fois/semaine",
  },
  { value: "hebdomadaire", label: "Hebdomadaire" },
  { value: "selon_besoins", label: "Selon les besoins" },
];

const modeCommunicationOptions = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "rencontre_physique", label: "Rencontres physiques" },
  { value: "appels", label: "Appels téléphoniques" },
  { value: "mixte", label: "Mixte (tous les moyens)" },
];

export default function PreferencesForm({
  onNext,
  onPrev,
  initialData,
}: PreferencesFormProps) {
  const defaultValuesForForm: Partial<PreferencesData> = {
    genreParrain: undefined,
    typeRelation: undefined,
    frequenceContact: undefined,
    modeCommunication: undefined,
    commentaires: "",
    accepteConditions: false,
    ...initialData,
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: defaultValuesForForm,
  });

  const onSubmit = (data: PreferencesData) => {
    onNext(data);
  };

  const commentairesValue = watch("commentaires") || "";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Vos Préférences</h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Aidez-nous à vous trouver le parrain idéal en précisant vos
          préférences
        </p>
      </div>

      <div className="grid gap-8">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Users className="w-6 h-6 text-blue-600" />
              Préférence de genre
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="genreParrain"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4"
                >
                  {genreParrainOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`genre-${option.value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`genre-${option.value}`}
                        className={`flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 relative ${
                          field.value === option.value
                            ? "border-blue-500 bg-blue-100 text-blue-900 shadow-md scale-105"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium">{option.label}</span>
                        {field.value === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.genreParrain && (
              <p className="text-sm text-red-600 mt-2">
                {errors.genreParrain.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Heart className="w-6 h-6 text-purple-600" />
              Type de relation souhaité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="typeRelation"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4"
                >
                  {typeRelationOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`relation-${option.value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`relation-${option.value}`}
                        className={`flex flex-col gap-1 sm:gap-2 p-2 sm:p-3 lg:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 relative ${
                          field.value === option.value
                            ? "border-blue-500 bg-blue-100 text-blue-900 shadow-lg scale-105"
                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base font-semibold">{option.label}</span>
                          {field.value === option.value && (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                        <p
                          className={`text-xs sm:text-sm ${
                            field.value === option.value
                              ? "text-blue-800"
                              : "text-gray-600"
                          }`}
                        >
                          {option.description}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.typeRelation && (
              <p className="text-sm text-red-600 mt-2">
                {errors.typeRelation.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Calendar className="w-6 h-6 text-green-600" />
              Fréquence de contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="frequenceContact"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
                >
                  {frequenceContactOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`frequence-${option.value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`frequence-${option.value}`}
                        className={`flex flex-col items-center justify-center text-center gap-1 sm:gap-2 p-2 sm:p-3 lg:p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 relative ${
                          field.value === option.value
                            ? "border-blue-500 bg-blue-100 text-blue-900 shadow-md scale-105"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          {option.label}
                        </span>
                        {field.value === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.frequenceContact && (
              <p className="text-sm text-red-600 mt-2">
                {errors.frequenceContact.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <MessageCircle className="w-6 h-6 text-orange-600" />
              Mode de communication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="modeCommunication"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4"
                >
                  {modeCommunicationOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`communication-${option.value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`communication-${option.value}`}
                        className={`flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 relative ${
                          field.value === option.value
                            ? "border-blue-500 bg-blue-100 text-blue-900 shadow-md scale-105"
                            : "border-gray-200"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-medium">{option.label}</span>
                        {field.value === option.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            ✓
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.modeCommunication && (
              <p className="text-sm text-red-600 mt-2">
                {errors.modeCommunication.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <FileText className="w-6 h-6 text-indigo-600" />
              Commentaires supplémentaires
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Ajoutez des informations qui pourraient aider à mieux vous matcher
            </p>
          </CardHeader>
          <CardContent>
            <Controller
              name="commentaires"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Exemple: Je préfère communiquer le soir après les cours, j'ai des difficultés particulières en mathématiques..."
                  rows={4}
                  className={`resize-none ${errors.commentaires ? "border-red-500" : ""}`}
                />
              )}
            />
            <div className="flex justify-between text-xs mt-2">
              <span
                className={
                  errors.commentaires ? "text-red-600" : "text-gray-500"
                }
              >
                {errors.commentaires ? errors.commentaires.message : ""}
              </span>
              <span className="text-gray-500">
                {commentairesValue?.length || 0}/200 caractères
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl text-blue-900">
              <Shield className="w-6 h-6 text-blue-600" />
              Conditions du programme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Respecter mon parrain et être respectueux dans nos échanges
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Le parrainage est bénévole et basé sur la bonne volonté
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Être présent et actif dans cette relation de mentorat
                </span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>
                  Mes données seront utilisées uniquement pour le matching
                </span>
              </div>
            </div>

            <Controller
              name="accepteConditions"
              control={control}
              render={({ field }) => (
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-blue-200">
                  <Checkbox
                    id="conditions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="conditions"
                    className="text-sm leading-relaxed font-medium"
                  >
                    J'accepte les conditions du programme de parrainage et je
                    m'engage à respecter ces règles
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
              )}
            />
            {errors.accepteConditions && (
              <p className="text-sm text-red-600">
                {errors.accepteConditions.message}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-between sm:items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={onPrev}
            className="order-2 sm:order-1 w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
          >
            {isSubmitting ? "Validation..." : "Continuer"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
