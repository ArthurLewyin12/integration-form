import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, ImageUp, X, ArrowLeft, CheckCircle } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { photoSchema } from "@/types/profile-image";
import { useEffect } from "react";

type PhotoData = z.infer<typeof photoSchema>;

interface PhotoUploadFormProps {
  onSubmit: (data: PhotoData) => void;
  onPrev: () => void;
  initialData?: Partial<PhotoData>;
  isSubmitting?: boolean;
}

export default function PhotoUploadForm({
  onSubmit,
  onPrev,
  initialData,
  isSubmitting = false,
}: PhotoUploadFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhotoData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      photo: undefined,
      ...initialData,
    },
  });

  const maxSizeMB = 10;
  const maxSize = maxSizeMB * 1024 * 1024; // 10MB

  const [
    { files, isDragging, errors: uploadErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/jpeg,image/jpg,image/png",
    maxSize,
  });

  useEffect(() => {
    if (files.length > 0 && files[0].file instanceof File) {
      setValue("photo", files[0].file, { shouldValidate: true });
    }
  }, [files, setValue]);

  const previewUrl = files[0]?.preview || null;

  const handleFormSubmit = (data: PhotoData) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Photo de profil</h2>
        <p className="text-gray-600 mt-2">
          Ajoutez votre photo pour que votre parrain puisse vous reconnaître
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload de photo */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Votre photo *</Label>
          <p className="text-sm text-gray-600">
            Choisissez une photo récente et claire de votre visage. Elle sera
            partagée avec votre parrain.
          </p>

          <Controller
            name="photo"
            control={control}
            render={() => (
              <div className="relative">
                {/* Zone de drop */}
                <div
                  role="button"
                  onClick={openFileDialog}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  data-dragging={isDragging || undefined}
                  className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-6 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                >
                  <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload photo"
                  />
                  {previewUrl ? (
                    <div className="absolute inset-0">
                      <img
                        src={previewUrl}
                        alt="Photo de profil"
                        className="size-full object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <div
                        className="bg-background mb-4 flex size-16 shrink-0 items-center justify-center rounded-full border-2"
                        aria-hidden="true"
                      >
                        <ImageUp className="size-8 opacity-60" />
                      </div>
                      <p className="mb-2 text-lg font-medium">
                        Glissez votre photo ici ou cliquez pour parcourir
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Formats acceptés : JPG, JPEG, PNG
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Taille maximum : {maxSizeMB}MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Bouton de suppression */}
                {previewUrl && (
                  <div className="absolute top-4 right-4">
                    <button
                      type="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-[color,box-shadow] outline-none hover:bg-black/90 focus-visible:ring-[3px]"
                      onClick={() => {
                        removeFile(files[0]?.id);
                        setValue("photo", undefined as any, {
                          shouldValidate: true,
                        });
                      }}
                      aria-label="Supprimer la photo"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}
          />

          {/* Erreurs d'upload */}
          {(uploadErrors.length > 0 || errors.photo) && (
            <div
              className="text-destructive flex items-center gap-1 text-sm"
              role="alert"
            >
              <AlertCircle className="size-4 shrink-0" />
              <span>{errors.photo?.message || uploadErrors[0]}</span>
            </div>
          )}

          {/* Confirmation quand photo uploadée */}
          {previewUrl && !errors.photo && (
            <div className="text-green-600 flex items-center gap-1 text-sm">
              <CheckCircle className="size-4 shrink-0" />
              <span>Photo téléchargée avec succès</span>
            </div>
          )}
        </div>

        {/* Conseils pour la photo */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">
            Conseils pour une bonne photo
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Utilisez une photo récente et claire</li>
            <li>• Assurez-vous que votre visage soit bien visible</li>
            <li>• Évitez les photos de groupe</li>
            <li>• Privilégiez un arrière-plan neutre</li>
            <li>• Souriez ! Cela facilite les premiers contacts</li>
          </ul>
        </div>

        {/* Note de confidentialité */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Confidentialité</h3>
          <p className="text-sm text-gray-700">
            Votre photo sera uniquement visible par votre parrain assigné et les
            organisateurs du programme. Elle ne sera pas diffusée publiquement.
          </p>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrev} disabled={isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          <Button
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting || !previewUrl}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Envoi en cours..." : "Finaliser mon inscription"}
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
