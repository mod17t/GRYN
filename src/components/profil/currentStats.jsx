// Composant Statistiques actuelles

function CurrentStats() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Statistiques actuelles</h4>
      <div className="space-y-4">
        <div className="p-4 bg-emerald-50 rounded-xl">
          <p className="text-sm text-emerald-700 mb-1">Émission actuelle</p>
          <p className="text-2xl font-bold text-emerald-900">580 kg</p>
          <p className="text-xs text-emerald-600 mt-1">CO₂/mois</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Objectif mensuel</span>
          <span className="font-semibold text-emerald-600">500 kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Réduction totale</span>
          <span className="font-semibold text-green-600">270 kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Challenges terminés</span>
          <span className="font-semibold text-blue-600">12</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentStats