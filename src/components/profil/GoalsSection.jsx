
import { Target } from "lucide-react";

// Composant Objectif individuel
function GoalItem({ goal }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-900 font-medium">{goal.title}</p>
        <span className="text-sm font-semibold text-emerald-600">{goal.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500">{goal.target}</p>
    </div>
  );
}

// Composant Section objectifs
function GoalsSection({ goals }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-emerald-600" />
        <h4 className="text-lg font-semibold">Mes objectifs</h4>
      </div>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <GoalItem key={index} goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default GoalsSection;