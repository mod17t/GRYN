import { useActionState }                                          from 'react';
import { Link }                                                   from 'react-router-dom';
import { Clock, Leaf, Mail, MapPin, User, LoaderPinwheel, Check } from 'lucide-react';
import { contactApi }          from '../services/api';
import { validateContactForm } from '../utils/validators';
import AlertMessage            from '../components/ui/AlertMessage';

const CONTACT_INFO = [
  { icon: Mail,   label: 'Email',    content: <a href="mailto:contact@gryn.com" className="text-emerald-900 hover:text-emerald-700 text-sm">contact@gryn.com</a> },
  { icon: MapPin, label: 'Adresse',  content: <p className="text-gray-600 text-sm">7 Rue Jean-Marie Leclair, 69009 Lyon</p> },
  { icon: Clock,  label: 'Horaires', content: <p className="text-gray-600 text-sm">Lun–Ven : 9h00–18h00<br />Sam : 10h00–16h00</p> },
];

const inputCls = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed';

export default function Contact() {
  const [state, submitAction, isPending] = useActionState(
    async (_prev, formData) => {
      const values = {
        name:    formData.get('name'),
        email:   formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };
      const err = validateContactForm(values);
      if (err) return { error: err, success: false };

      try {
        await contactApi.send(values);
        return { success: true, error: null };
      } catch (e) {
        return { error: e.message || "Une erreur s'est produite.", success: false };
      }
    },
    { success: false, error: null }
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Contactez-nous</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Une question ou une suggestion ? Notre équipe est là pour vous accompagner.
          </p>
        </div>

        {state.success ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
            <p className="text-gray-500 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition text-sm">
              Retour à l'accueil
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Infos */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-5">Informations de contact</h3>
                <div className="space-y-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-900 mb-0.5">{label}</p>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <Leaf className="w-6 h-6 mb-3" />
                  <h4 className="font-semibold mb-1">Le saviez-vous ?</h4>
                  <p className="text-emerald-100 text-sm">
                    En répondant par email plutôt que par courrier, vous économisez environ 6g de CO₂ par message !
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-6">Envoyez-nous un message</h3>

              <form action={submitAction} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-600" /> Nom *
                    </label>
                    <input type="text" name="name" disabled={isPending} placeholder="Votre nom" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-emerald-600" /> Email *
                    </label>
                    <input type="email" name="email" disabled={isPending} placeholder="votre@email.com" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet *</label>
                  <input type="text" name="subject" disabled={isPending} placeholder="Sujet de votre message" className={inputCls} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea name="message" rows={5} disabled={isPending} placeholder="Votre message..." className={`${inputCls} resize-none`} />
                </div>

                <AlertMessage message={state.error} type="error" />

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <><LoaderPinwheel className="animate-spin w-4 h-4" /><span>Envoi en cours...</span></>
                  ) : (
                    <span>Envoyer le message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
