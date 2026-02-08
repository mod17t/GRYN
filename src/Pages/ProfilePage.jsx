import ProfileHeader from "../components/profil/ProfileHeader";
import BadgesSection from "../components/profil/BadgeSection";
import RecentActivity from "../components/profil/Activity";
import CurrentStats from "../components/profil/currentStats";
import GoalsSection from "../components/profil/GoalsSection";
import ImpactSummary from "../components/profil/ImpactSummary";
import QuickActions from "../components/profil/QuickActions";
import EmissionsChart from "../components/profil/EmissionChart";

import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

function ProfilePage() {
  const { user, monthlyData, badges, goals, recentActivities } =
    useContext(ProfileContext);


  return (
      <section className="min-h-screen bg-gray-50 py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ProfileHeader user={user} />

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              <EmissionsChart data={monthlyData} />
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
