
// Composant Activité individuelle
function ActivityItem({ activity }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="text-3xl">{activity.icon}</div>
      <div className="flex-1">
        <p className="text-gray-900 font-medium mb-1">{activity.title}</p>
        <p className="text-sm text-gray-500">{activity.date}</p>
      </div>
    </div>
  );
}

// Composant Section activité récente
function RecentActivity({ activities }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Activité récente</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default RecentActivity