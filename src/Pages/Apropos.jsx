import { useEffect, useState }              from 'react';
import { Link }                            from 'react-router-dom';
import { Target, Eye, Heart, Users, Leaf } from 'lucide-react';
import { statsApi }                        from '../services/api';

const VALUES = [
  { icon: Leaf,  title: 'Écologie',      desc: "Nous plaçons la protection de l'environnement au cœur de toutes nos décisions." },
  { icon: Users, title: 'Accessibilité', desc: "Des outils simples et gratuits pour rendre l'action écologique accessible à tous." },
  { icon: Heart, title: 'Engagement',    desc: "Nous nous engageons pour un avenir durable et encourageons chacun à agir." },
  { icon: Eye,   title: 'Impact global', desc: "Chaque action individuelle contribue à un changement collectif significatif." },
];

const METHODOLOGY = [
  { title: "Facteurs d'émission certifiés",  text: "Base Carbone® de l'ADEME et données du GIEC AR6, régulièrement mises à jour." },
  { title: "Approche holistique",             text: "Transport, alimentation, énergie et consommation — les 4 postes d'émissions couverts." },
  { title: "Transparence totale",             text: "Chaque résultat est accompagné d'explications et de recommandations personnalisées." },
  { title: "Amélioration continue",           text: "Nos algorithmes sont affinés grâce aux retours utilisateurs et aux dernières recherches." },
];

export default function Apropos() {
  const [stats,   setStats]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsApi.index()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full mb-6 text-sm">
            <Leaf className="w-4 h-4" /> Notre histoire
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">À propos de GRYN</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nous sommes une équipe passionnée convaincue que chaque individu peut contribuer à la lutte
            contre le changement climatique. Notre mission : rendre le suivi de l'empreinte carbone
            accessible, ludique et efficace.
          </p>
          <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl p-12 max-w-3xl mx-auto">
            <p className="text-6xl mb-4">🌍</p>
            <p className="text-emerald-800 font-semibold text-xl">Agir ensemble pour la planète</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Notre mission</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Donner à chacun les moyens de comprendre, mesurer et réduire son empreinte carbone
              grâce à des outils numériques simples et efficaces.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Notre vision</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Un monde où chaque citoyen est conscient de son impact environnemental et dispose des
              outils pour agir. Chaque petite action quotidienne crée un impact significatif.
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Nos valeurs</h2>
            <p className="text-gray-500 text-sm">Les principes qui guident notre action au quotidien.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-16 px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-2">Notre impact en chiffres</h2>
          <p className="text-emerald-100 mb-10 text-sm">Ensemble, nous faisons la différence.</p>
          {loading ? (
            <p className="text-emerald-100">Chargement…</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-6">
                  <p className="text-4xl font-bold mb-1">{stat.numbers}</p>
                  <p className="text-emerald-100 text-sm">{stat.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notre méthodologie</h2>
            <p className="text-gray-500 text-sm">Des calculs basés sur des données scientifiques reconnues.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            {METHODOLOGY.map(({ title, text }, i) => (
              <div key={title} className="flex gap-4">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rejoignez le mouvement</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm">
          Commencez dès aujourd'hui à mesurer et réduire votre empreinte carbone.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/calculateur" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition text-sm">
            Commencer maintenant
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-emerald-500 hover:text-emerald-600 transition text-sm">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
}
