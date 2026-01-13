import { User, Award,Target, Calendar } from "lucide-react";

// Composant En-tête du profil
function ProfileHeader({ user }) {
  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
          <User className="w-12 h-12" />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-emerald-100 mb-4">{user.email}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Award className="w-5 h-5" />
              <span>Niveau {user.level} - Éco-acteur</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span>Membre depuis {user.joinDate}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Target className="w-5 h-5" />
              <span>{user.points} points</span>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
          Modifier le profil
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader
