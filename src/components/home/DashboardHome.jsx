import { Link } from "react-router-dom";
import {
  Calculator,
  Trophy,
  Leaf,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import Spinner from "../ui/Spinner";

function StatCard({ label, value, unit, icon: Icon, color }) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100`}
    >
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${color}`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {value ?? "—"}
        {value && unit && (
          <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        )}
      </p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { profile, isLoading } = useProfile();

  if (isLoading) return <Spinner />;

  const firstName = user?.first_name ?? user?.name?.split(" ")[0] ?? "là";
  const lastEmission = profile?.latest_emission
    ? parseFloat(profile.latest_emission).toFixed(0)
    : null;
  const FRENCH_AVG = 940;
  const isGood = lastEmission && Number(lastEmission) < FRENCH_AVG;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bandeau de bienvenue */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-emerald-200 text-sm font-medium mb-2">
            Bon retour parmi nous 👋
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Bonjour, {firstName} !
          </h1>
          <p className="text-emerald-100 max-w-xl">
            Prêt à continuer votre démarche écologique ? Voici un résumé de
            votre activité.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        {/* Stats rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            label="Dernière émission"
            value={lastEmission}
            unit="kg CO₂/mois"
            icon={Leaf}
            color="bg-emerald-500"
          />
          <StatCard
            label="Points accumulés"
            value={profile?.points ?? 0}
            unit="pts"
            icon={Trophy}
            color="bg-amber-500"
          />
          <StatCard
            label="Niveau actuel"
            value={profile?.level ? `Niveau ${profile.level}` : null}
            icon={TrendingUp}
            color="bg-blue-500"
          />
        </div>

        {/* Comparaison avec la moyenne */}
        {lastEmission && (
          <div
            className={`rounded-2xl p-6 border-2 flex items-start gap-4 ${
              isGood
                ? "bg-emerald-50 border-emerald-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isGood ? "bg-emerald-500" : "bg-amber-500"
              }`}
            >
              {isGood ? (
                <TrendingDown className="w-5 h-5 text-white" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <p
                className={`font-semibold mb-1 ${isGood ? "text-emerald-800" : "text-amber-800"}`}
              >
                {isGood
                  ? `Vous émettez ${Math.round(((FRENCH_AVG - Number(lastEmission)) / FRENCH_AVG) * 100)}% de moins que la moyenne française`
                  : `Vous émettez ${Math.round(((Number(lastEmission) - FRENCH_AVG) / FRENCH_AVG) * 100)}% de plus que la moyenne française`}
              </p>
              <p
                className={`text-sm ${isGood ? "text-emerald-600" : "text-amber-600"}`}
              >
                Moyenne française : {FRENCH_AVG} kg CO₂/mois · Votre dernière
                mesure : {lastEmission} kg CO₂/mois
              </p>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/calculateur"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Nouveau calcul</p>
                  <p className="text-sm text-gray-500">
                    Mesurer mes émissions du mois
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition" />
            </Link>

            <Link
              to="/challenges"
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mes challenges</p>
                  <p className="text-sm text-gray-500">
                    {profile?.completed_challenges_count
                      ? `${profile.completed_challenges_count} challenge(s) terminé(s)`
                      : "Rejoindre un challenge"}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition" />
            </Link>
          </div>
        </div>

        {/* Message si aucun calcul */}
        {!lastEmission && (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-emerald-300">
            <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Commencez votre suivi carbone
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              Effectuez votre premier calcul pour voir vos émissions et
              débloquer votre premier badge.
            </p>
            <Link
              to="/calculateur"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition text-sm"
            >
              Calculer mon empreinte <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
