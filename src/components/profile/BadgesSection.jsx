import { Award, Leaf, BarChart2, Trophy, Star, Shield, Crown } from 'lucide-react';

// Mapping icônes texte → composant Lucide (icons stockés en texte dans la DB)
const ICON_MAP = {
  leaf:    Leaf,
  chart:   BarChart2,
  trophy:  Trophy,
  star:    Star,
  shield:  Shield,
  crown:   Crown,
};

function BadgeItem({ badge }) {
  const Icon = ICON_MAP[badge.icon] ?? Award;

  return (
    <div className={`text-center p-4 rounded-xl transition-all ${
      badge.earned
        ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200'
        : 'bg-gray-50 opacity-50 border-2 border-gray-100'
    }`}>
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${badge.earned ? 'bg-amber-200 text-amber-700' : 'bg-gray-200 text-gray-400'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className={`text-sm font-semibold mb-0.5 ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
        {badge.name}
      </p>
      {badge.earned && badge.earned_at ? (
        <p className="text-xs text-gray-400">
          {new Date(badge.earned_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
        </p>
      ) : (
        <p className="text-xs text-gray-300">Non obtenu</p>
      )}
    </div>
  );
}

export default function BadgesSection({ badges }) {
  if (!badges?.length) return null;
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Badges ({earnedCount}/{badges.length})
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map((badge) => <BadgeItem key={badge.id} badge={badge} />)}
      </div>
    </div>
  );
}
