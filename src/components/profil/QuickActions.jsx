// Composant Actions rapides
function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold mb-4">Actions rapides</h4>
      <div className="space-y-3">
        <button className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Nouveau calcul
        </button>
        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Voir mes challenges
        </button>
        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Télécharger mon bilan
        </button>
      </div>
    </div>
  );
}

export default QuickActions