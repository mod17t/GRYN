import { useNavigate }        from 'react-router-dom';
import { User, Award, Star }  from 'lucide-react';

export default function ProfileHeader({ profile }) {
  const navigate = useNavigate();
  if (!profile) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 shrink-0">
          <User className="w-10 h-10 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold mb-1 truncate">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-emerald-100 text-sm mb-4 truncate">{profile.email}</p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-sm">
              <Award className="w-4 h-4" /> Niveau {profile.level}
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-sm">
              <Star className="w-4 h-4" /> {profile.points} pts
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-1.5 text-sm">
              🏆 {profile.completed_challenges_count} challenges
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/edit-profile')}
          className="px-5 py-2.5 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition shrink-0"
        >
          Modifier le profil
        </button>
      </div>
    </div>
  );
}
