import { Car, Leaf, BatteryCharging, ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  { icon: Car,             title: 'Transport',    desc: 'Voiture, train, avion',   bg: 'bg-blue-50',   iconBg: 'bg-blue-400'    },
  { icon: Leaf,            title: 'Alimentation', desc: 'Régime alimentaire',      bg: 'bg-emerald-50', iconBg: 'bg-emerald-400' },
  { icon: BatteryCharging, title: 'Énergie',      desc: 'Électricité, chauffage',  bg: 'bg-amber-50',  iconBg: 'bg-amber-400'   },
  { icon: ShoppingBag,     title: 'Consommation', desc: 'Achats, déchets',         bg: 'bg-purple-50', iconBg: 'bg-purple-400'  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Catégories suivies</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Analysez votre impact dans les quatre domaines principaux de votre vie quotidienne.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(({ icon: Icon, title, desc, bg, iconBg }) => (
            <div key={title} className={`${bg} rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow`}>
              <div className={`w-20 h-20 ${iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
