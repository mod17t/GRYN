import { useActionState, useState }              from 'react';
import { Link, useNavigate }                    from 'react-router-dom';
import { Leaf, Mail, Lock, Eye, EyeOff, User }  from 'lucide-react';
import { useAuth }                              from '../context/AuthContext';
import { validateLoginForm, validateSignUpForm } from '../utils/validators';
import AlertMessage                             from '../components/ui/AlertMessage';
import Button                                   from '../components/ui/Button';
import InputField                               from '../components/ui/InputField';

const MODES = { LOGIN: 'login', SIGNUP: 'signup' };

export default function Login() {
  const { login, signUp } = useAuth();
  const navigate          = useNavigate();

  const [mode,         setMode]         = useState(MODES.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === MODES.LOGIN;

  // useActionState (React 19) — gestion du formulaire sans useState pour chaque champ
  const [error, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      const values = Object.fromEntries(formData.entries());

      const validationError = isLogin
        ? validateLoginForm(values)
        : validateSignUpForm(values);

      if (validationError) return validationError;

      try {
        isLogin
          ? await login({ email: values.email, password: values.password })
          : await signUp(values);
        navigate('/profil');
        return null;
      } catch (err) {
        return err.message || 'Une erreur est survenue.';
      }
    },
    null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GRYN</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form action={submitAction} className="space-y-4">

            {/* Prénom + Nom (inscription) */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Prénom" name="first_name" icon={User} placeholder="Prénom" disabled={isPending} />
                <InputField label="Nom"    name="last_name"  icon={User} placeholder="Nom"    disabled={isPending} />
              </div>
            )}

            {/* Email */}
            <InputField label="Email" type="email" name="email" icon={Mail} placeholder="votre@email.com" disabled={isPending} />

            {/* Mot de passe */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  disabled={isPending}
                  className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition"
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmation (inscription) */}
            {!isLogin && (
              <InputField
                label="Confirmer le mot de passe"
                type={showPassword ? 'text' : 'password'}
                name="password_confirmation"
                icon={Lock}
                placeholder="••••••••"
                disabled={isPending}
              />
            )}

            {/* Mot de passe oublié */}
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition">
                  Mot de passe oublié ?
                </Link>
              </div>
            )}

            <AlertMessage message={error} type="error" />

            <Button type="submit" isLoading={isPending} className="w-full mt-2">
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
              <button
                type="button"
                onClick={() => setMode(isLogin ? MODES.SIGNUP : MODES.LOGIN)}
                className="text-emerald-600 font-semibold hover:underline"
              >
                {isLogin ? 'Créer un compte' : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
