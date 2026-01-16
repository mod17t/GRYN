

// Composant Badge individuel
function BadgeItem({ badge }) {
  return (
    <div
      className={`text-center p-4 rounded-xl transition-all ${
        badge.earned
          ? "bg-linear-to-br from-amber-50 to-amber-100 border-2 border-amber-200"
          : "bg-gray-50 opacity-50"
      }`}
    >
      <div className={`text-4xl mb-2 ${!badge.earned && "grayscale"}`}>
        {badge.icon}
      </div>
      <p className={`text-sm font-medium mb-1 ${badge.earned ? "text-gray-900" : "text-gray-400"}`}>
        {badge.name}
      </p>
      <p className="text-xs text-gray-500">{badge.date}</p>
    </div>
  );
}

export default BadgeItem