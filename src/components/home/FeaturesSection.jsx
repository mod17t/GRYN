import { Calculator, TrendingDown, Trophy } from 'lucide-react';

const FEATURES = [
  {
    icon:      Calculator,
    title:     "Calculateur d'empreinte",
    desc:      'Calculez votre empreinte carbone grâce à notre outil précis basé sur la Base Carbone® ADEME.',
    bgIcon:    'bg-emerald-100',
    textIcon:  'text-emerald-600',
  },
  {
    icon:      TrendingDown,
    title:     'Suivi personnalisé',
    desc:      "Visualisez l'évolution de vos émissions au fil du temps avec des graphiques détaillés.",
    bgIcon:    'bg-blue-100',
    textIcon:  'text-blue-600',
  },
  {
    icon:      Trophy,
    title:     'Challenges écologiques',
    desc:      'Relevez des défis et gagnez des badges pour récompenser vos efforts écologiques.',
    bgIcon:    'bg-amber-100',
    textIcon:  'text-amber-600',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Nos fonctionnalités principales
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Des outils simples et efficaces pour comprendre et réduire votre impact environnemental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article key={f.title} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow duration-300">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bgIcon} ${f.textIcon} mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
