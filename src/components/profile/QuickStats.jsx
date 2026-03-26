import { Link }                    from 'react-router-dom';
import { Calculator, Trophy, Leaf } from 'lucide-react';

export default function QuickStats({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
      <h4 className="text-base font-semibold text-gray-900">Statistiques</h4>

      <div className="p-4 bg-emerald-50 rounded-xl">
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">Dernière émission</p>
        </div>
        <p className="text-2xl font-bold text-emerald-900">
          {profile.latest_emission
            ? `${parseFloat(profile.latest_emission).toFixed(0)} kg`
            : '—'
          }
        </p>
        <p className="text-xs text-emerald-600 mt-0.5">CO₂ / mois</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Points</span>
          <span className="font-semibold text-emerald-600">{profile.points}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Niveau</span>
          <span className="font-semibold text-blue-600">{profile.level} / 10</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Challenges terminés</span>
          <span className="font-semibold text-amber-600">{profile.completed_challenges_count}</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Link to="/calculateur" className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition text-sm">
          <Calculator className="w-4 h-4" /> Nouveau calcul
        </Link>
        <Link to="/challenges" className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition text-sm">
          <Trophy className="w-4 h-4" /> Voir les challenges
        </Link>
      </div>
    </div>
  );
}
