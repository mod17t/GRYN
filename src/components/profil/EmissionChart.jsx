import { TrendingDown} from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Composant Graphique des émissions
function EmissionsChart({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">Évolution de vos émissions</h3>
          <p className="text-sm text-gray-600">Suivi mensuel en kg CO₂</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium">
          <TrendingDown className="w-5 h-5" />
          <span>-31% sur 8 mois</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorEmissions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmissionsChart;