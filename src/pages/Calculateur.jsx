import { useState }              from 'react';
import { Car, Utensils, Zap, ShoppingBag, ChevronRight, ChevronLeft, Leaf, Award } from 'lucide-react';
import { calculationsApi }       from '../services/api';
import { useAuth }               from '../context/AuthContext';
import { useProfile }            from '../context/ProfileContext';
import Button                    from '../components/ui/Button';
import AlertMessage              from '../components/ui/AlertMessage';

// ─── Constantes ───────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  transport:    { voiture: 0, train: 0, bus: 0, avion: 0, velo: 0, moto: 0 },
  alimentation: { regime: 'omnivore', kg_viande: 0, kg_poulet: 0, kg_poisson: 0 },
  energie:      { electricite: 0, gaz: 0, renouvelable: false },
  consommation: { niveau: 'moyen' },
};

const STEPS = [
  { id: 0, label: 'Transport',    icon: Car       },
  { id: 1, label: 'Alimentation', icon: Utensils  },
  { id: 2, label: 'Énergie',      icon: Zap       },
  { id: 3, label: 'Consommation', icon: ShoppingBag },
];

const FRENCH_AVG_MONTHLY = 940; // kg CO₂/mois moyenne française

// ─── Champs ───────────────────────────────────────────────────────────────────

function NumberInput({ label, value, onChange, unit = 'km/mois', hint }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
          min="0"
          step="1"
          className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-sm"
        />
        <span className="text-xs text-gray-400 whitespace-nowrap">{unit}</span>
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function RadioCards({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition ${
            value === opt.value
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-gray-200 text-gray-600 hover:border-emerald-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Étapes ───────────────────────────────────────────────────────────────────

function StepTransport({ data, set }) {
  const modes = [
    { field: 'voiture', label: '🚗 Voiture',     hint: '0.218 kg/km' },
    { field: 'train',   label: '🚆 Train',        hint: '0.009 kg/km' },
    { field: 'bus',     label: '🚌 Bus',           hint: '0.029 kg/km' },
    { field: 'avion',   label: '✈️ Avion',        hint: '0.258 kg/km' },
    { field: 'moto',    label: '🏍 Moto',          hint: '0.191 kg/km' },
    { field: 'velo',    label: '🚲 Vélo / Marche', hint: '0 émission'  },
  ];
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Kilomètres parcourus en moyenne par mois.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {modes.map((m) => (
          <NumberInput key={m.field} label={m.label} value={data[m.field]} onChange={(v) => set({ ...data, [m.field]: v })} unit="km/mois" hint={m.hint} />
        ))}
      </div>
    </div>
  );
}

function StepAlimentation({ data, set }) {
  const regimes = [
    { value: 'omnivore',    label: '🍖 Omnivore'    },
    { value: 'flexitarien', label: '🥩 Flexitarien' },
    { value: 'pescetarien', label: '🐟 Pescétarien' },
    { value: 'vegetarien',  label: '🥗 Végétarien'  },
    { value: 'vegetalien',  label: '🌱 Végétalien'  },
  ];
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">Votre régime alimentaire et votre consommation mensuelle de protéines.</p>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Type de régime</label>
        <RadioCards options={regimes} value={data.regime} onChange={(v) => set({ ...data, regime: v })} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <NumberInput label="🥩 Viande rouge"  value={data.kg_viande}  onChange={(v) => set({ ...data, kg_viande: v })}  unit="kg/mois" hint="27 kg CO₂/kg" />
        <NumberInput label="🍗 Poulet"         value={data.kg_poulet}  onChange={(v) => set({ ...data, kg_poulet: v })}  unit="kg/mois" hint="5.7 kg CO₂/kg" />
        <NumberInput label="🐟 Poisson"        value={data.kg_poisson} onChange={(v) => set({ ...data, kg_poisson: v })} unit="kg/mois" hint="6.1 kg CO₂/kg" />
      </div>
    </div>
  );
}

function StepEnergie({ data, set }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">Consommation mensuelle d'énergie dans votre domicile.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <NumberInput label="⚡ Électricité" value={data.electricite} onChange={(v) => set({ ...data, electricite: v })} unit="kWh/mois" hint="0.052 kg/kWh" />
        <NumberInput label="🔥 Gaz"          value={data.gaz}         onChange={(v) => set({ ...data, gaz: v })}         unit="kWh/mois" hint="0.227 kg/kWh" />
      </div>
      <label className="flex items-center gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-100 transition">
        <input
          type="checkbox"
          checked={data.renouvelable}
          onChange={(e) => set({ ...data, renouvelable: e.target.checked })}
          className="w-5 h-5 accent-emerald-600"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">🌿 Énergie renouvelable</p>
          <p className="text-xs text-gray-500">Réduit les émissions énergie de 70%</p>
        </div>
      </label>
    </div>
  );
}

function StepConsommation({ data, set }) {
  const niveaux = [
    { value: 'tres_peu', label: '🌱 Très peu',  desc: 'Achats rares, seconde main'     },
    { value: 'peu',      label: '👍 Peu',        desc: 'Achats modérés et réfléchis'    },
    { value: 'moyen',    label: '🛍 Moyen',      desc: 'Consommation standard'           },
    { value: 'beaucoup', label: '🛒 Beaucoup',   desc: 'Achats fréquents et impulsifs'  },
  ];
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Votre niveau de consommation de biens (vêtements, appareils...).</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {niveaux.map((n) => (
          <button
            key={n.value}
            type="button"
            onClick={() => set({ niveau: n.value })}
            className={`p-4 rounded-xl border-2 text-left transition ${
              data.niveau === n.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            <p className="font-semibold text-gray-800 text-sm mb-0.5">{n.label}</p>
            <p className="text-xs text-gray-500">{n.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Résultats ────────────────────────────────────────────────────────────────

function ResultsSection({ result, newBadges, onReset }) {
  const { emissions } = result;
  const total = emissions.total;
  const isAboveAvg = total > FRENCH_AVG_MONTHLY;
  const pct = Math.round(Math.abs(total - FRENCH_AVG_MONTHLY) / FRENCH_AVG_MONTHLY * 100);

  const cats = [
    { label: 'Transport',    value: emissions.transport,    color: 'bg-blue-500',    bg: 'bg-blue-50',    text: 'text-blue-700'    },
    { label: 'Alimentation', value: emissions.alimentation, color: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
    { label: 'Énergie',      value: emissions.energie,      color: 'bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700'   },
    { label: 'Consommation', value: emissions.consommation, color: 'bg-purple-500',  bg: 'bg-purple-50',  text: 'text-purple-700'  },
  ];

  return (
    <div className="space-y-6 mt-8">
      {/* Score principal */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white text-center">
        <p className="text-emerald-100 mb-1">Votre empreinte mensuelle</p>
        <p className="text-5xl font-bold mb-2">
          {total.toFixed(0)} <span className="text-2xl font-normal">kg CO₂</span>
        </p>
        <p className={`text-sm font-medium ${isAboveAvg ? 'text-red-300' : 'text-emerald-200'}`}>
          {isAboveAvg ? `+${pct}% au-dessus` : `${pct}% en dessous`} de la moyenne française ({FRENCH_AVG_MONTHLY} kg)
        </p>
      </div>

      {/* Badges débloqués */}
      {newBadges?.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <p className="font-bold text-amber-800">Nouveau(x) badge(s) débloqué(s) !</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {newBadges.map((b) => (
              <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-xl text-sm font-medium text-amber-800">
                <Leaf className="w-3.5 h-3.5" /> {b.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Détail par catégorie */}
      <div className="grid sm:grid-cols-2 gap-4">
        {cats.map((cat) => (
          <div key={cat.label} className={`${cat.bg} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-sm font-semibold ${cat.text}`}>{cat.label}</p>
              <p className="text-lg font-bold text-gray-900">{cat.value.toFixed(0)} kg</p>
            </div>
            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
              <div className={`h-full ${cat.color} rounded-full`} style={{ width: total > 0 ? `${(cat.value / total) * 100}%` : '0%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {total > 0 ? `${((cat.value / total) * 100).toFixed(0)}% du total` : '—'}
            </p>
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={onReset} className="w-full">
        Refaire un calcul
      </Button>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Calculateur() {
  const { isAuthenticated }      = useAuth();
  const { refetch }              = useProfile();

  const [step,      setStep]      = useState(0);
  const [formData,  setFormData]  = useState(INITIAL_FORM);
  const [result,    setResult]    = useState(null);
  const [newBadges, setNewBadges] = useState([]);
  const [error,     setError]     = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const update = (section, value) =>
    setFormData((prev) => ({ ...prev, [section]: value }));

  const handleSubmit = async () => {
    if (!isAuthenticated) { setError('Vous devez être connecté.'); return; }
    setIsLoading(true);
    setError('');
    try {
      const res = await calculationsApi.store(formData);
      setResult(res);
      setNewBadges(res.new_badges ?? []);
      refetch();
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setResult(null);
    setNewBadges([]);
    setStep(0);
    setError('');
  };

  const current = STEPS[step];
  const StepIcon = current.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Calculateur d'empreinte carbone</h1>
          <p className="text-gray-500 text-sm">Données mensuelles · Base Carbone® ADEME / GIEC AR6</p>
        </div>

        {!result ? (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Onglets étapes */}
            <div className="flex border-b border-gray-100">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStep(s.id)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition ${
                      step === s.id ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Contenu étape */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <StepIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{current.label}</h2>
              </div>

              {step === 0 && <StepTransport    data={formData.transport}    set={(v) => update('transport', v)}    />}
              {step === 1 && <StepAlimentation data={formData.alimentation} set={(v) => update('alimentation', v)} />}
              {step === 2 && <StepEnergie      data={formData.energie}      set={(v) => update('energie', v)}      />}
              {step === 3 && <StepConsommation data={formData.consommation} set={(v) => update('consommation', v)} />}

              <AlertMessage message={error} type="error" className="mt-4" />

              {/* Navigation */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                {step > 0 && (
                  <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
                    <ChevronLeft className="w-4 h-4" /> Précédent
                  </Button>
                )}
                {step < STEPS.length - 1 ? (
                  <Button onClick={() => setStep((s) => s + 1)} className="flex-1">
                    Suivant <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} isLoading={isLoading} disabled={!isAuthenticated} className="flex-1">
                    Calculer mon empreinte
                  </Button>
                )}
              </div>

              {!isAuthenticated && (
                <p className="mt-3 text-center text-sm text-amber-600">
                  ⚠️ <a href="/login" className="font-semibold underline">Connectez-vous</a> pour enregistrer votre calcul.
                </p>
              )}
            </div>
          </div>
        ) : (
          <ResultsSection result={result} newBadges={newBadges} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
