import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, Mail } from "lucide-react";

export const Route = createFileRoute("/success")({
  component: SuccessComponent,
});

function SuccessComponent() {
  const phoneNumber = "2250152024919"; // Préfixe +225
  const message = "Bonjour, je crois m'être trompé lors de mon inscription.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Icon de succès */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        <Card className="border-0 shadow-xl backdrop-blur-sm bg-white/80">
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Inscription réussie !
            </CardTitle>
            <p className="text-gray-600 text-lg leading-relaxed">
              Votre demande de parrainage a bien été enregistrée
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Étapes suivantes */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Prochaines étapes
                  </h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Vérifiez votre boîte mail (y compris les spams)</li>
                    <li>• Confirmez votre adresse email</li>
                    <li>• Nous vous contacterons sous 48h</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Message d'information */}
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">
                Notre équipe analyse votre profil pour vous trouver le parrain
                idéal
              </p>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-gray-50/50 space-y-4">
            <div className="w-full text-center">
              <p className="text-sm text-gray-600 mb-4">
                Une erreur dans votre inscription ?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/*<Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <a href="/" className="no-underline">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à l'accueil
                  </a>
                </Button>*/}

                <Button
                  asChild
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    title="Ouvre WhatsApp Web si vous n'avez pas l'application"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contacter via WhatsApp
                  </a>
                </Button>
              </div>

              {/* Alternative de contact */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">
                  Pas d'accès à WhatsApp ? Vous pouvez aussi :
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-xs">
                  <span className="text-gray-600">
                    📧 Email :{" "}
                    <a
                      href="mailto:irieemanuel5@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      irieemanuel5@gmail.com
                    </a>
                  </span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className="text-gray-600">
                    📱 SMS :{" "}
                    <a
                      href="sms:+2250152024919"
                      className="text-blue-600 hover:underline"
                    >
                      +225 01 52 02 49 19
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Note de bas de page */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            En cas de problème, n'hésitez pas à nous contacter
          </p>
        </div>
      </div>
    </div>
  );
}
