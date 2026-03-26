import { useActionState, useState } from 'react';
import { Link }                    from 'react-router-dom';
import { Mail, ArrowLeft, Send, BadgeCheck } from 'lucide-react';
import { authApi }       from '../services/api';
import { validateEmail } from '../utils/validators';
import Button            from '../components/ui/Button';
import AlertMessage      from '../components/ui/AlertMessage';

export default function ForgotPassword() {
  const [sentEmail, setSentEmail] = useState('');

  const [error, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      const email = formData.get('email');
      const err   = validateEmail(email);
      if (err) return err;

      try {
        await authApi.forgotPassword(email);
        setSentEmail(email);
        return null;
      } catch (e) {
        return e.message || "Une erreur s'est produite.";
      }
    },
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Mot de passe oublié ?</h2>
            <p className="text-emerald-100 text-sm">
              Entrez votre email pour recevoir un lien de réinitialisation.
            </p>
          </div>

          <div className="p-8">
            {sentEmail ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <BadgeCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Email envoyé !</h3>
                <p className="text-sm text-gray-500 mb-1">Lien envoyé à</p>
                <p className="text-emerald-600 font-semibold mb-6">{sentEmail}</p>
                <p className="text-xs text-gray-400 mb-6">Le lien est valide 1 heure. Vérifiez aussi votre dossier spam.</p>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition">
                  <ArrowLeft className="w-4 h-4" /> Retour à la connexion
                </Link>
              </div>
            ) : (
              <form action={submitAction} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Adresse email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      disabled={isPending}
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <AlertMessage message={error} type="error" />

                <Button type="submit" isLoading={isPending} className="w-full">
                  <Send className="w-4 h-4" /> Envoyer le lien
                </Button>

                <p className="text-center text-sm text-gray-500">
                  <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                    ← Retour à la connexion
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
