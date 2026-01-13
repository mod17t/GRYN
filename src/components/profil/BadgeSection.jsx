import { Award } from "lucide-react";
import BadgeItem from "./BadgeItem"

// Composant Section des badges
 function BadgesSection({ badges }) {
  const earnedCount = badges.filter(b => b.earned).length;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-amber-600" />
        <h3 className="text-xl font-semibold">
          Badges obtenus ({earnedCount}/{badges.length})
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <BadgeItem key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
}

export default BadgesSection