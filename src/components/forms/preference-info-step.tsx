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
  { value: "homme", label: "Homme", icon: "👨" },
  { value: "femme", label: "Femme", icon: "👩" },
  { value: "peu_importe", label: "Peu importe", icon: "🤝" },
];

const typeRelationOptions = [
  {
    value: "mentor_academique",
    label: "Mentor académique",
    description: "Aide pour les cours et études",
    icon: "📚",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    value: "guide_social",
    label: "Guide social",
    description: "Intégration et événements",
    icon: "🎉",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
  },
  {
    value: "conseiller_carriere",
    label: "Conseiller carrière",
    description: "Orientation professionnelle",
    icon: "💼",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  {
    value: "ami_senior",
    label: "Ami senior",
    description: "Relation décontractée",
    icon: "😊",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
];

const frequenceContactOptions = [
  { value: "quotidien", label: "Quotidien", icon: "⚡" },
  {
    value: "plusieurs_fois_semaine",
    label: "Plusieurs fois/semaine",
    icon: "📅",
  },
  { value: "hebdomadaire", label: "Hebdomadaire", icon: "📆" },
  { value: "selon_besoins", label: "Selon les besoins", icon: "🔔" },
];

const modeCommunicationOptions = [
  { value: "whatsapp", label: "WhatsApp", icon: "💬" },
  { value: "rencontre_physique", label: "Rencontres physiques", icon: "🤝" },
  { value: "appels", label: "Appels téléphoniques", icon: "📞" },
  { value: "mixte", label: "Mixte (tous les moyens)", icon: "🌐" },
];

export default function PreferencesForm({
  onNext,
  onPrev,
  initialData,
}: PreferencesFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PreferencesData) => {
    onNext(data);
  };

  const commentairesValue = watch("commentaires") || "";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Vos Préférences</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              name="genre_parrain"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {genreParrainOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`genre-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`genre-${option.value}`}
                        className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md peer-checked:scale-105 transition-all duration-200 relative"
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full items-center justify-center text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity hidden peer-checked:flex">
                          ✓
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.genre_parrain && (
              <p className="text-sm text-red-600 mt-2">
                {errors.genre_parrain.message}
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
              name="type_relation"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {typeRelationOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`relation-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`relation-${option.value}`}
                        className={`flex flex-col gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${option.color} peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:shadow-lg peer-checked:scale-105 relative`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-semibold text-gray-900">
                            {option.label}
                          </span>
                          <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full items-center justify-center text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity hidden peer-checked:flex">
                            ✓
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11">
                          {option.description}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.type_relation && (
              <p className="text-sm text-red-600 mt-2">
                {errors.type_relation.message}
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
              name="frequence_contact"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {frequenceContactOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`frequence-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`frequence-${option.value}`}
                        className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md peer-checked:scale-105 transition-all duration-200 text-center relative"
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium text-sm">
                          {option.label}
                        </span>
                        <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full items-center justify-center text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity hidden peer-checked:flex">
                          ✓
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.frequence_contact && (
              <p className="text-sm text-red-600 mt-2">
                {errors.frequence_contact.message}
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
              name="mode_communication"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {modeCommunicationOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`communication-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`communication-${option.value}`}
                        className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-orange-500 peer-checked:bg-orange-50 peer-checked:shadow-md peer-checked:scale-105 transition-all duration-200 relative"
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        <div className="ml-auto w-6 h-6 bg-orange-500 rounded-full items-center justify-center text-white text-sm opacity-0 peer-checked:opacity-100 transition-opacity hidden peer-checked:flex">
                          ✓
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.mode_communication && (
              <p className="text-sm text-red-600 mt-2">
                {errors.mode_communication.message}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
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
              name="accepte_conditions"
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
            {errors.accepte_conditions && (
              <p className="text-sm text-red-600">
                {errors.accepte_conditions.message}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 text-base bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 text-base "
          >
            {isSubmitting ? "Validation..." : "Continuer"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
