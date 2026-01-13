// Composant Résumé de l'impact
function ImpactSummary() {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6">
      <h4 className="text-lg font-semibold mb-4">Votre impact</h4>
      <div className="space-y-4">
        <div>
          <p className="text-green-100 text-sm mb-1">Équivalent à</p>
          <p className="text-3xl font-bold mb-1">34</p>
          <p className="text-sm text-green-100">arbres plantés 🌳</p>
        </div>
        <div className="border-t border-green-500 pt-4">
          <p className="text-green-100 text-sm mb-1">Ou encore</p>
          <p className="text-lg font-medium">2 400 km de voiture économisés 🚗</p>
        </div>
      </div>
    </div>
  );
}

export default ImpactSummary