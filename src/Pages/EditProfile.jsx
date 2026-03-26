import { useActionState }           from 'react';
import { useNavigate }             from 'react-router-dom';
import { User, Mail, Save, X }     from 'lucide-react';
import { profileApi }              from '../services/api';
import { useAuth }                 from '../context/AuthContext';
import { useProfile }              from '../context/ProfileContext';
import Button                      from '../components/ui/Button';
import InputField                  from '../components/ui/InputField';
import AlertMessage                from '../components/ui/AlertMessage';

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const { updateProfile }    = useProfile();
  const navigate             = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      const values = {
        first_name: formData.get('first_name'),
        last_name:  formData.get('last_name'),
        email:      formData.get('email'),
      };

      if (!values.first_name?.trim() || !values.last_name?.trim())
        return 'Le prénom et le nom sont requis.';

      try {
        const res = await profileApi.update(values);
        updateUser(res.data);
        updateProfile(res.data);
        navigate('/profil');
        return null;
      } catch (e) {
        return e.message || 'Impossible de mettre à jour le profil.';
      }
    },
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white">
            <h1 className="text-2xl font-bold mb-1">Modifier mon profil</h1>
            <p className="text-emerald-100 text-sm">Mettez à jour vos informations personnelles.</p>
          </div>

          <form action={submitAction} className="p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Prénom" name="first_name" icon={User} defaultValue={user?.first_name ?? ''} placeholder="Votre prénom" disabled={isPending} />
              <InputField label="Nom"    name="last_name"  icon={User} defaultValue={user?.last_name  ?? ''} placeholder="Votre nom"    disabled={isPending} />
            </div>

            <InputField label="Adresse email" type="email" name="email" icon={Mail} defaultValue={user?.email ?? ''} placeholder="votre@email.com" disabled={isPending} />

            <AlertMessage message={error} type="error" />

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate('/profil')} disabled={isPending}>
                <X className="w-4 h-4" /> Annuler
              </Button>
              <Button type="submit" isLoading={isPending} className="flex-1">
                <Save className="w-4 h-4" /> Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
