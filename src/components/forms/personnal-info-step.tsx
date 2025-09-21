"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { personalInfoSchema } from "@/types/personnal-info";

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onNext: (data: PersonalInfoData) => void;
  initialData?: Partial<PersonalInfoData>;
}

export default function PersonalInfoForm({
  onNext,
  initialData,
}: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      annee: "L1",
      ...initialData,
    },
  });

  const onSubmit = (data: PersonalInfoData) => {
    onNext(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold">Informations personnelles</h2>
        <p className="text-muted-foreground text-lg">
          Commençons par vos informations de base
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Identité
            </CardTitle>
            <CardDescription>Vos informations d'identification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  {...register("nom")}
                  placeholder="Votre nom de famille"
                />
                {errors.nom && (
                  <p className="text-sm text-destructive">
                    {errors.nom.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenoms">Prénoms *</Label>
                <Input
                  id="prenoms"
                  {...register("prenoms")}
                  placeholder="Vos prénoms"
                />
                {errors.prenoms && (
                  <p className="text-sm text-destructive">
                    {errors.prenoms.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Âge *
                </Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  placeholder="Votre âge"
                  min="17"
                  max="25"
                />
                {errors.age && (
                  <p className="text-sm text-destructive">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="annee" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Année d'étude
                </Label>
                <Input
                  id="annee"
                  {...register("annee")}
                  value="L1"
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Fixé par défaut pour cette inscription
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </CardTitle>
            <CardDescription>Vos coordonnées de contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="votre.email@exemple.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone *
              </Label>
              <Input
                id="telephone"
                {...register("telephone")}
                placeholder="0123456789"
              />
              {errors.telephone && (
                <p className="text-sm text-destructive">
                  {errors.telephone.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Format attendu : 10 chiffres sans espaces
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="pt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Validation...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Continuer
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
