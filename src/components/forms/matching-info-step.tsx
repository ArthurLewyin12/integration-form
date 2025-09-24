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
  User,
  Target,
  BookOpen,
  Users,
  MessageSquare,
} from "lucide-react";
import { matchingSchema } from "@/types/matching-info";

type MatchingInfoData = z.infer<typeof matchingSchema>;

// Extraire les types des énumérations du schéma Zod
type Hobby = z.infer<typeof matchingSchema.shape.hobbies.element>;
type Specialisation = z.infer<
  typeof matchingSchema.shape.specialisationInteresse.element
>;
type Objectif = z.infer<typeof matchingSchema.shape.objectifsEtudes.element>;

interface MatchingInfoFormProps {
  onNext: (data: MatchingInfoData) => void;
  onPrev: () => void;
  initialData?: Partial<MatchingInfoData>;
}

// Options pour les checkboxes et radio buttons
const hobbiesOptions: { value: Hobby; label: string }[] = [
  { value: "sport", label: "Sport général" },
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
  { value: "musique", label: "Musique" },
  { value: "lecture", label: "Lecture" },
  { value: "gaming", label: "Gaming" },
  { value: "cinema", label: "Cinéma" },
  { value: "technologie", label: "Technologie" },
  { value: "programmation", label: "Programmation" },
  { value: "design", label: "Design" },
  { value: "entrepreneuriat", label: "Entrepreneuriat" },
  { value: "voyage", label: "Voyage" },
  { value: "cuisine", label: "Cuisine" },
];

const specialisationOptions: { value: Specialisation; label: string }[] = [
  { value: "developpement_web", label: "Développement Web" },
  { value: "mobile", label: "Développement Mobile" },
  { value: "data_science", label: "Data Science" },
  { value: "cybersecurite", label: "Cybersécurité" },
  { value: "ia", label: "Intelligence Artificielle" },
  { value: "gestion_projet", label: "Gestion de Projet" },
  { value: "systemes_information", label: "Systèmes d'Information" },
  { value: "reseaux", label: "Réseaux" },
];

const objectifsOptions: { value: Objectif; label: string }[] = [
  { value: "avoir_mention", label: "Obtenir une mention" },
  { value: "faire_stage_entreprise", label: "Faire un stage en entreprise" },
  { value: "projet_perso", label: "Développer un projet personnel" },
  { value: "bouger ailleurs", label: "Partir étudier ailleurs" },
  { value: "creation_startup", label: "Créer une startup" },
  { value: "certification_tech", label: "Obtenir des certifications tech" },
  {
    value: "competition_programmation",
    label: "Participer à des compétitions",
  },
];

const personnaliteOptions = [
  { value: "extraverti", label: "Extraverti(e)" },
  { value: "introverti", label: "Introverti(e)" },
  { value: "equilibre", label: "Équilibré(e)" },
];

const styleApprentissageOptions = [
  { value: "pratique_hands_on", label: "Pratique/Hands-on" },
  { value: "theorique_conceptuel", label: "Théorique/Conceptuel" },
  { value: "groupe_collaboratif", label: "En groupe/Collaboratif" },
  { value: "individuel_autonome", label: "Individuel/Autonome" },
];

const niveauTechniqueOptions = [
  { value: "debutant", label: "Débutant" },
  { value: "quelques_bases", label: "Quelques bases" },
  { value: "intermediaire", label: "Intermédiaire" },
  { value: "avance", label: "Avancé" },
];

const participationAssoOptions = [
  { value: "tres_actif", label: "Très actif" },
  { value: "occasionnel", label: "Occasionnel" },
  { value: "observateur", label: "Observateur" },
  { value: "pas_interesse", label: "Pas intéressé" },
];

export default function MatchingInfoForm({
  onNext,
  onPrev,
  initialData,
}: MatchingInfoFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MatchingInfoData>({
    resolver: zodResolver(matchingSchema),
    defaultValues: {
      hobbies: [],
      specialisationInteresse: [],
      objectifsEtudes: [],
      ...initialData,
    },
  });

  const onSubmit = (data: MatchingInfoData) => {
    onNext(data);
  };

  const attentesValue = watch("attentesParrainage") || "";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">Centres d'intérêt</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Aidez-nous à vous trouver le parrain idéal en nous parlant de vos
          passions et objectifs
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8">
          {/* Centres d'intérêt Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Centres d'intérêt
              </CardTitle>
              <p className="text-sm text-gray-600">
                Sélectionnez tous ceux qui vous intéressent
              </p>
            </CardHeader>
            <CardContent>
              <Controller
                name="hobbies"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hobbiesOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={`hobby-${option.value}`}
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const fieldValue = field.value || [];
                            if (checked) {
                              field.onChange([...fieldValue, option.value]);
                            } else {
                              field.onChange(
                                fieldValue.filter(
                                  (item) => item !== option.value,
                                ),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`hobby-${option.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.hobbies && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.hobbies.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Personality and Learning Style - Side by side on larger screens */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Type de personnalité Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  Type de personnalité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="personnalite"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      {personnaliteOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`personnalite-${option.value}`}
                          />
                          <Label
                            htmlFor={`personnalite-${option.value}`}
                            className="font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.personnalite && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.personnalite.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Style d'apprentissage Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Style d'apprentissage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="styleApprentissage"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      {styleApprentissageOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`style-${option.value}`}
                          />
                          <Label
                            htmlFor={`style-${option.value}`}
                            className="font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.styleApprentissage && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.styleApprentissage.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Spécialisations d'intérêt Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Domaines qui vous intéressent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="specialisationInteresse"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {specialisationOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={`specialisation-${option.value}`}
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const fieldValue = field.value || [];
                            if (checked) {
                              field.onChange([...fieldValue, option.value]);
                            } else {
                              field.onChange(
                                fieldValue.filter(
                                  (item) => item !== option.value,
                                ),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`specialisation-${option.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.specialisationInteresse && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.specialisationInteresse.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Objectifs d'études Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                Objectifs d'études
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="objectifsEtudes"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {objectifsOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          id={`objectif-${option.value}`}
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const fieldValue = field.value || [];
                            if (checked) {
                              field.onChange([...fieldValue, option.value]);
                            } else {
                              field.onChange(
                                fieldValue.filter(
                                  (item) => item !== option.value,
                                ),
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`objectif-${option.value}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.objectifsEtudes && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.objectifsEtudes.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Technical Level and Association Participation - Side by side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Niveau technique Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Niveau technique actuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="niveauTechnique"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      {niveauTechniqueOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`niveau-${option.value}`}
                          />
                          <Label
                            htmlFor={`niveau-${option.value}`}
                            className="font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.niveauTechnique && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.niveauTechnique.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Participation associative Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  Participation associative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="participationAsso"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      {participationAssoOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`participation-${option.value}`}
                          />
                          <Label
                            htmlFor={`participation-${option.value}`}
                            className="font-medium cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.participationAsso && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.participationAsso.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Attentes du parrainage Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-pink-600" />
                Attentes du parrainage
              </CardTitle>
              <p className="text-sm text-gray-600">
                Décrivez ce que vous attendez de votre parrain (aide académique,
                conseils, réseau...)
              </p>
            </CardHeader>
            <CardContent>
              <Controller
                name="attentesParrainage"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Exemple: J'aimerais avoir des conseils sur les projets à réaliser, de l'aide pour comprendre certains concepts difficiles, et des conseils d'orientation pour la suite de mes études..."
                    rows={4}
                    className={`resize-none ${errors.attentesParrainage ? "border-red-500" : ""}`}
                  />
                )}
              />
              <div className="flex justify-between text-xs mt-2">
                <span
                  className={
                    errors.attentesParrainage
                      ? "text-red-600"
                      : "text-gray-500"
                  }
                >
                  {errors.attentesParrainage
                    ? errors.attentesParrainage.message
                    : ""}
                </span>
                <span className="text-gray-500">
                  {attentesValue.length}/300 caractères
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? "Validation..." : "Continuer"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
