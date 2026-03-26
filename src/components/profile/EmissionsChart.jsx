import { TrendingDown } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

export default function EmissionsChart({ trends }) {
  if (!trends || trends.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Évolution de vos émissions</h3>
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-sm">Effectuez votre premier calcul pour voir vos tendances ici.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Évolution de vos émissions</h3>
          <p className="text-sm text-gray-500">Suivi mensuel en kg CO₂</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
          <TrendingDown className="w-4 h-4" /> {trends.length} mois
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={trends}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit=" kg" />
          <Tooltip formatter={(v) => [`${v} kg CO₂`, 'Émissions']} />
          <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2.5} fill="url(#grad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
