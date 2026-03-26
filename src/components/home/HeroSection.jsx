import { Link }               from 'react-router-dom';
import { ArrowRight, TrendingDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-white px-6 py-12 md:py-20">
      <div className="mx-auto max-w-7xl flex flex-col-reverse items-center gap-10 md:flex-row">

        {/* Texte */}
        <div className="w-full md:w-1/2 space-y-6">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            Pour un avenir durable
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Suivez et réduisez votre{' '}
            <span className="text-emerald-600">empreinte carbone</span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Calculez vos émissions de CO₂, suivez votre progression et relevez des défis
            écologiques pour contribuer à un monde plus vert.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/calculateur"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Commencer le calcul <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-6 py-3 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              En savoir plus
            </Link>
          </div>
        </div>

        {/* Visuel */}
        <div className="w-full md:w-1/2">
          <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow-lg">
            {/* Stats visuelles */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Utilisateurs actifs', value: '2 400+' },
                { label: 'CO₂ économisé',       value: '1.2M kg' },
                { label: 'Challenges actifs',   value: '6'       },
                { label: 'Badges disponibles',  value: '6'       },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Badge flottant */}
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Réduction moyenne</p>
                <p className="text-base font-bold text-gray-900">25% par utilisateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
