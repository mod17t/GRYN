import { useCallback, useEffect, useState } from 'react';
import { Calendar, Users, TrendingDown }    from 'lucide-react';
import { challengesApi }  from '../services/api';
import { useAuth }        from '../context/AuthContext';
import Button             from '../components/ui/Button';
import AlertMessage       from '../components/ui/AlertMessage';
import Spinner            from '../components/ui/Spinner';

const DIFFICULTY_STYLES = {
  Facile:    'bg-emerald-100 text-emerald-700',
  Moyen:     'bg-amber-100 text-amber-700',
  Difficile: 'bg-red-100 text-red-700',
};

function ChallengeCard({ challenge, onJoin, onUpdateProgress, onComplete, isAuthenticated }) {
  const participation = challenge.my_participation;
  const [progress,     setProgress]     = useState(participation?.progress ?? 0);
  const [isJoining,    setIsJoining]    = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    try { await onJoin(challenge.id); } finally { setIsJoining(false); }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try { await onComplete(challenge.id); } finally { setIsCompleting(false); }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_STYLES[challenge.difficulty] ?? "bg-gray-100 text-gray-600"}`}
        >
          {challenge.difficulty}
        </span>
        {challenge.badge && (
          <span className="text-lg" title={`Badge : ${challenge.badge.name}`}>
            ⭐
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {challenge.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed">
        {challenge.description}
      </p>

      <div className="space-y-1.5 mb-5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {challenge.duration_days} jours
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" /> {challenge.participants_count}{" "}
          participant(s)
        </div>
        <div className="flex items-center gap-2 text-emerald-600 font-medium">
          <TrendingDown className="w-4 h-4" /> {challenge.co2_reduction_kg} kg
          CO₂ potentiels
        </div>
        <div className="text-amber-600 font-medium">
          ⭐ {challenge.points_reward} pts
        </div>
      </div>

      {/* Barre de progression */}
      {participation?.status === "joined" && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            onMouseUp={() => onUpdateProgress(challenge.id, progress)}
            onTouchEnd={() => onUpdateProgress(challenge.id, progress)}
            className="w-full h-2 accent-emerald-600"
          />
        </div>
      )}

      {participation?.status === "completed" && (
        <div className="p-3 bg-emerald-50 rounded-xl text-sm text-emerald-700 font-medium text-center mb-4">
          ✅ Challenge complété !
        </div>
      )}

      {isAuthenticated && (
        <div className="flex gap-2">
          {/* Pas encore rejoint */}
          {!participation && (
            <Button
              onClick={handleJoin}
              isLoading={isJoining}
              className="flex-1 text-sm py-2"
            >
              Rejoindre
            </Button>
          )}

          {/* En cours */}
          {participation?.status === "joined" && (
            <div className="flex-1 space-y-2">
              <div className="w-full py-2 px-3 text-center text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                🟢 En cours · {progress}%
              </div>
              <Button
                onClick={handleComplete}
                isLoading={isCompleting}
                variant="ghost"
                className="w-full text-sm py-2"
              >
                Valider le challenge
              </Button>
            </div>
          )}

          {/* Terminé */}
          {participation?.status === "completed" && (
            <div className="w-full py-2 px-3 text-center text-sm font-semibold text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              🏆 Challenge terminé
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: 'all',  label: 'Tous les challenges' },
  { id: 'mine', label: 'Mes challenges'       },
];

export default function Challenges() {
  const { isAuthenticated } = useAuth();

  const [challenges, setChallenges] = useState([]);
  const [activeTab,  setActiveTab]  = useState('all');
  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState('');

  const loadChallenges = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await challengesApi.index();
      setChallenges(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadChallenges(); }, [loadChallenges]);

  const handleJoin           = async (id)             => { await challengesApi.join(id);                await loadChallenges(); };
  const handleUpdateProgress = async (id, progress)   => { await challengesApi.updateProgress(id, progress); };
  const handleComplete       = async (id)             => { await challengesApi.complete(id);             await loadChallenges(); };

  const myIds    = new Set(challenges.filter((c) => c.my_participation).map((c) => c.id));
  const displayed = activeTab === 'mine' ? challenges.filter((c) => myIds.has(c.id)) : challenges;

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 space-y-4">
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
              Passez à l'action
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Relevez des <span className="text-emerald-600">défis écologiques</span>
            </h1>
            <p className="text-gray-500">
              Participez à des challenges pour réduire votre impact et gagner des badges.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Challenges', value: challenges.length },
              { label: 'Participants', value: challenges.reduce((s, c) => s + c.participants_count, 0) },
              { label: 'kg CO₂ pot.', value: challenges.reduce((s, c) => s + Number(c.co2_reduction_kg), 0).toFixed(0) },
            ].map((s) => (
              <div key={s.label} className="bg-emerald-50 rounded-2xl p-4">
                <p className="text-2xl font-bold text-emerald-700">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liste */}
      <section className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <AlertMessage message={error} type="error" />

          {isAuthenticated && (
            <div className="flex gap-1 mb-8 border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-4 text-sm font-semibold transition ${
                    activeTab === tab.id ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {displayed.length === 0 ? (
            <p className="text-center text-gray-400 py-16">
              {activeTab === 'mine' ? "Vous n'avez rejoint aucun challenge." : 'Aucun challenge disponible.'}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayed.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onJoin={handleJoin}
                  onUpdateProgress={handleUpdateProgress}
                  onComplete={handleComplete}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          )}

          {!isAuthenticated && (
            <p className="text-center text-sm text-amber-600 mt-6">
              ⚠️ <a href="/login" className="font-semibold underline">Connectez-vous</a> pour rejoindre des challenges.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
