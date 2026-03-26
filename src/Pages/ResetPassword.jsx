import { useActionState, useEffect, useState } from 'react';
import { Link, useSearchParams }              from 'react-router-dom';
import { Leaf, Lock }                         from 'lucide-react';
import { authApi }    from '../services/api';
import Button         from '../components/ui/Button';
import AlertMessage   from '../components/ui/AlertMessage';

export default function ResetPassword() {
  const [searchParams]          = useSearchParams();
  const [tokenEmail, setTokenEmail] = useState(searchParams.get('email') ?? '');
  const [tokenError, setTokenError] = useState('');
  const [isDone,     setIsDone]     = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) { setTokenError('Lien invalide.'); return; }

    authApi.getResetToken(token)
      .then((data) => { if (data?.email) setTokenEmail(data.email); })
      .catch(() => setTokenError('Lien invalide ou expiré.'));
  }, []); // eslint-disable-line

  const [error, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      const password              = formData.get('password');
      const password_confirmation = formData.get('password_confirmation');

      if (!password || password.length < 8)
        return 'Le mot de passe doit contenir au moins 8 caractères.';
      if (password !== password_confirmation)
        return 'Les mots de passe ne correspondent pas.';

      try {
        await authApi.resetPassword({
          token:    searchParams.get('token'),
          email:    tokenEmail,
          password,
          password_confirmation,
        });
        setIsDone(true);
        return null;
      } catch (e) {
        return e.message || 'Erreur serveur.';
      }
    },
    null
  );

  const inputCls = 'w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GRYN</h1>
          <p className="text-gray-500 text-sm mt-1">Réinitialisation du mot de passe</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {tokenError ? (
            <div className="text-center">
              <AlertMessage message={tokenError} type="error" />
              <Link to="/forgot-password" className="mt-4 inline-block text-sm text-emerald-600 font-medium hover:underline">
                Refaire une demande
              </Link>
            </div>
          ) : isDone ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mot de passe réinitialisé !</h3>
              <p className="text-sm text-gray-500 mb-6">Vous pouvez maintenant vous connecter.</p>
              <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition">
                Aller à la connexion
              </Link>
            </div>
          ) : (
            <form action={submitAction} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
                  <input type="password" name="password" placeholder="8 caractères minimum" disabled={isPending} className={inputCls} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
                  <input type="password" name="password_confirmation" placeholder="Confirmez" disabled={isPending} className={inputCls} />
                </div>
              </div>

              <AlertMessage message={error} type="error" />

              <Button type="submit" isLoading={isPending} className="w-full">
                Réinitialiser le mot de passe
              </Button>

              <p className="text-center text-sm text-gray-500">
                <Link to="/login" className="text-emerald-600 font-medium hover:underline">← Retour</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
