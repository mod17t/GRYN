import { useProfile }   from '../context/ProfileContext';
import ProfileHeader    from '../components/profile/ProfileHeader';
import EmissionsChart   from '../components/profile/EmissionsChart';
import BadgesSection    from '../components/profile/BadgesSection';
import QuickStats       from '../components/profile/QuickStats';
import Spinner          from '../components/ui/Spinner';
import AlertMessage     from '../components/ui/AlertMessage';

export default function ProfilePage() {
  const { profile, trends, badges, isLoading, error } = useProfile();

  if (isLoading) return <Spinner />;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <AlertMessage message={error} type="error" />
        <ProfileHeader profile={profile} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EmissionsChart trends={trends} />
            <BadgesSection  badges={badges} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <QuickStats profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
