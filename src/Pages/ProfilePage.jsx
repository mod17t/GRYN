import ProfileHeader from '../components/profil/ProfileHeader'; 
import BadgesSection from '../components/profil/BadgeSection';
import RecentActivity from '../components/profil/Activity';
import CurrentStats from '../components/profil/currentStats';
import GoalsSection from '../components/profil/GoalsSection';
import ImpactSummary from '../components/profil/ImpactSummary';
import QuickActions from '../components/profil/QuickActions';

function ProfilePage() {
  const user = {
    name: "Alex Martin",
    email: "alex.martin@email.com",
    joinDate: "Mars 2024",
    level: 3,
    points: 1250
  };

  const badges = [
    { name: "Éco-débutant", icon: "🌱", date: "Mars 2024", earned: true },
    { name: "Cycliste urbain", icon: "🚴", date: "Avril 2024", earned: true },
    { name: "Végétarien", icon: "🥗", date: "Mai 2024", earned: true },
    { name: "Économe", icon: "💡", date: "Juin 2024", earned: true },
    { name: "Zéro déchet", icon: "♻️", date: "-", earned: false },
    { name: "Champion", icon: "🏆", date: "-", earned: false },
    { name: "Ambassadeur", icon: "⭐", date: "-", earned: false },
    { name: "Légende", icon: "👑", date: "-", earned: false }
  ];

  const goals = [
    { title: "Réduire de 30% mes émissions", progress: 65, target: "Décembre 2025" },
    { title: "Compléter 20 challenges", progress: 60, target: "Fin d'année" },
    { title: "Passer sous 500kg CO₂/mois", progress: 80, target: "Septembre 2025" }
  ];

  const recentActivities = [
    { title: "Challenge 'Semaine sans voiture' commencé", date: "Il y a 2 jours", icon: "🚴" },
    { title: "Badge 'Économe' débloqué", date: "Il y a 5 jours", icon: "💡" },
    { title: "Nouvelle empreinte calculée: 650kg CO₂", date: "Il y a 1 semaine", icon: "📊" },
    { title: "Challenge 'Lundi vert' terminé", date: "Il y a 2 semaines", icon: "🥗" }
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ProfileHeader user={user} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            <BadgesSection badges={badges} />
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Barre latérale */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <CurrentStats />
              <GoalsSection goals={goals} />
              <ImpactSummary />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;