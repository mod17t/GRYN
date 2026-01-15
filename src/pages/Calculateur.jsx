import React, { useState } from 'react';
import { Trash2, Car, Utensils, Zap, ShoppingBag } from 'lucide-react';

const InputField = ({ label, value, onChange, icon: Icon }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
        placeholder="0"
        min="0"
      />
      <button
        onClick={() => onChange(0)}
        className="p-2 text-gray-400 hover:text-gray-600 touch-manipulation"
        aria-label="Réinitialiser"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const SliderField = ({ label, value, onChange, min, max, unit, helpText }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 touch-manipulation"
    />
    <div className="text-sm text-gray-600 mt-1">{helpText}</div>
  </div>
);

const SectionCard = ({ icon: Icon, title, subtitle, children, color }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4">
    <div className="flex items-start gap-3 mb-4">
      <div className={`p-2 rounded-lg ${color} flex-shrink-0`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

const ResultsSection = ({ formData }) => {
  // Calculs simplifiés (coefficients d'émission en kg CO2)
  const transport = formData.transport.voiture * 0.2 + 
                    formData.transport.train * 0.01 + 
                    formData.transport.bus * 0.05;
  
  // Alimentation basée sur le régime et la fréquence
  const regimeFactors = {
    'Omnivore': 2400,
    'Végétarien': 1680,
    'Végétalien': 1440,
    'Pescetarien': 2000
  };
  const alimentation = (regimeFactors[formData.alimentation.regime] || 2400) * 
                       (formData.alimentation.frequence / 100);
  
  const energie = (formData.energie.electricite * 0.5 + formData.energie.gaz * 0.3) *
                  (formData.energie.renouvelable ? 0.3 : 1);
  
  // Consommation basée sur le niveau d'achats
  const consommationFactors = {
    'Très peu': 500,
    'Peu': 800,
    'Moyen': 1050,
    'Beaucoup': 1500
  };
  const consommation = (consommationFactors[formData.equipements.nombre] || 1050) *
                       (formData.equipements.montant / 100);

  const total = transport + alimentation + energie + consommation;

  // Calcul des pourcentages
  const transportPct = total > 0 ? Math.round((transport / total) * 100) : 0;
  const alimentationPct = total > 0 ? Math.round((alimentation / total) * 100) : 0;
  const energiePct = total > 0 ? Math.round((energie / total) * 100) : 0;
  const consommationPct = total > 0 ? Math.round((consommation / total) * 100) : 0;

  return (
    <div className="mt-8">
      {/* Titre */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Répartition de vos émissions
      </h2>

      {/* Graphiques */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Graphique en camembert */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">Par catégorie</h3>
            <div className="flex flex-col items-center gap-4">
              {/* Graphique circulaire */}
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full relative" style={{
                background: `conic-gradient(
                  #10b981 0% ${alimentationPct}%,
                  #a855f7 ${alimentationPct}% ${alimentationPct + consommationPct}%,
                  #eab308 ${alimentationPct + consommationPct}% ${alimentationPct + consommationPct + energiePct}%,
                  #3b82f6 ${alimentationPct + consommationPct + energiePct}% 100%
                )`
              }}></div>
              
              {/* Légende */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">Alimentation {alimentationPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">Consommation {consommationPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">Énergie {energiePct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm">Transport {transportPct}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Graphique en barres */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-center">
              Comparaison avec la moyenne
            </h3>
            <div className="h-48 sm:h-64 flex items-end justify-around gap-2 sm:gap-4 px-2 sm:px-4">
              {[
                { label: 'Transport', value: transport, avg: 2000 },
                { label: 'Alim.', labelFull: 'Alimentation', value: alimentation, avg: 2400 },
                { label: 'Énergie', value: energie, avg: 1500 },
                { label: 'Conso.', labelFull: 'Consommation', value: consommation, avg: 1000 }
              ].map((item) => {
                const maxValue = 2500;
                return (
                  <div key={item.label} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-center gap-1 mb-2" style={{ height: '150px' }}>
                      {/* Barre moyenne (grise) */}
                      <div className="w-6 sm:w-8 bg-gray-300 rounded-t self-end" style={{
                        height: `${(item.avg / maxValue) * 100}%`
                      }}></div>
                      {/* Barre utilisateur (verte) */}
                      <div className="w-6 sm:w-8 bg-green-500 rounded-t self-end" style={{
                        height: `${(item.value / maxValue) * 100}%`
                      }}></div>
                    </div>
                    <div className="text-xs text-gray-600 text-center" title={item.labelFull}>
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
                <span>Vos émissions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded"></div>
                <span>Moyenne</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes avec détails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Car className="text-blue-600 flex-shrink-0" size={20} />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Transport</h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(transport)} kg</p>
          <p className="text-xs sm:text-sm text-blue-600 mt-2">
            L'avion est le mode de transport le plus polluant. Privilégiez le train !
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Utensils className="text-green-600 flex-shrink-0" size={20} />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Alimentation</h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(alimentation)} kg</p>
          <p className="text-xs sm:text-sm text-green-600 mt-2">
            Un régime végétarien réduit de 30% l'empreinte carbone alimentaire.
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-yellow-600 flex-shrink-0" size={20} />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Énergie</h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(energie)} kg</p>
          <p className="text-xs sm:text-sm text-yellow-600 mt-2">
            Isolez votre logement et optez pour des énergies renouvelables.
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="text-purple-600 flex-shrink-0" size={20} />
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Consommation</h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(consommation)} kg</p>
          <p className="text-xs sm:text-sm text-purple-600 mt-2">
            Achetez moins mais mieux, réparez et recyclez au maximum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({
    transport: { voiture: 0, train: 0, bus: 0 },
    alimentation: { regime: 'Omnivore', frequence: 50 },
    energie: { electricite: 0, gaz: 0, renouvelable: false },
    equipements: { nombre: 'Moyen', montant: 50 }
  });

  const [showResults, setShowResults] = useState(false);

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const calculateEmissions = () => {
    setShowResults(true);
    // Scroll vers les résultats
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Calculateur d'empreinte carbone
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Entrez vos données mensuelles pour calculer votre empreinte carbone et découvrir comment la réduire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Transport */}
            <SectionCard
              icon={Car}
              title="Transport"
              subtitle="Km parcourus par mois"
              color="bg-blue-500"
            >
              <InputField
                label="Voiture (km/mois)"
                value={formData.transport.voiture}
                onChange={(val) => updateField('transport', 'voiture', val)}
              />
              <InputField
                label="Train (km/mois)"
                value={formData.transport.train}
                onChange={(val) => updateField('transport', 'train', val)}
              />
              <InputField
                label="Bus (km/mois)"
                value={formData.transport.bus}
                onChange={(val) => updateField('transport', 'bus', val)}
              />
            </SectionCard>

            {/* Alimentation */}
            <SectionCard
              icon={Utensils}
              title="Alimentation"
              subtitle="Type de régime"
              color="bg-green-500"
            >
              <SelectField
                label="Type de régime"
                value={formData.alimentation.regime}
                onChange={(val) => updateField('alimentation', 'regime', val)}
                options={['Omnivore', 'Végétarien', 'Végétalien', 'Pescetarien']}
              />
              <SliderField
                label="Fréquence viande/poisson"
                value={formData.alimentation.frequence}
                onChange={(val) => updateField('alimentation', 'frequence', val)}
                min={0}
                max={100}
                helpText={`Vous en consommez ${formData.alimentation.frequence}%`}
              />
            </SectionCard>

            {/* Énergie */}
            <SectionCard
              icon={Zap}
              title="Énergie"
              subtitle="Utilisation mensuelle"
              color="bg-yellow-500"
            >
              <InputField
                label="Électricité (kWh/mois)"
                value={formData.energie.electricite}
                onChange={(val) => updateField('energie', 'electricite', val)}
              />
              <InputField
                label="Gaz (kWh/mois)"
                value={formData.energie.gaz}
                onChange={(val) => updateField('energie', 'gaz', val)}
              />
              <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                <input
                  type="checkbox"
                  checked={formData.energie.renouvelable}
                  onChange={(e) => updateField('energie', 'renouvelable', e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm sm:text-base">Énergie des énergies renouvelables</span>
              </label>
            </SectionCard>

            {/* Équipements */}
            <SectionCard
              icon={ShoppingBag}
              title="Équipements"
              subtitle="Achats et consommation"
              color="bg-purple-500"
            >
              <SelectField
                label="Nombre d'achats"
                value={formData.equipements.nombre}
                onChange={(val) => updateField('equipements', 'nombre', val)}
                options={['Très peu', 'Peu', 'Moyen', 'Beaucoup']}
              />
              <SliderField
                label="Montant par achats (€)"
                value={formData.equipements.montant}
                onChange={(val) => updateField('equipements', 'montant', val)}
                min={0}
                max={100}
                helpText={`Vous en dépensez ${formData.equipements.montant}%`}
              />
            </SectionCard>

            {/* Calculate Button */}
            <button
              onClick={calculateEmissions}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 touch-manipulation text-base sm:text-lg"
            >
              Calculer mon empreinte carbone
            </button>

            {/* Results Section */}
            {showResults && (
              <ResultsSection formData={formData} />
            )}
          </div>

          {/* Right Column - Info Box */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:sticky lg:top-4">
              <div className="text-3xl sm:text-4xl mb-2">💡</div>
              <p className="text-sm text-gray-700">
                Remplissez le formulaire et cliquez sur "Calculer" pour voir votre empreinte carbone actuelle et vos objectifs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}