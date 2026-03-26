import { Calculator, TrendingDown, Trophy } from 'lucide-react';

const STEPS = [
  { number: 1, icon: Calculator,   title: 'Calculez vos émissions',  desc: 'Entrez vos données de transport, alimentation, énergie et consommation.' },
  { number: 2, icon: TrendingDown, title: 'Analysez vos résultats',  desc: 'Visualisez votre empreinte avec des graphiques et comparez à la moyenne française.' },
  { number: 3, icon: Trophy,       title: 'Relevez des défis',       desc: 'Participez à des challenges écologiques pour réduire votre impact et gagner des badges.' },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Trois étapes simples pour commencer votre voyage vers un mode de vie plus durable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-emerald-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
