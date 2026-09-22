import { useEffect, useState } from 'react';
import { displayDate, fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/activities/', controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <p className="text-uppercase small fw-semibold text-primary mb-1">Training log</p><h1 className="h2 mb-4">Recent activities</h1>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="table-responsive bg-white rounded shadow-sm"><table className="table align-middle mb-0"><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || activity.id}><td className="fw-semibold text-capitalize">{activity.type || 'Workout'}</td><td>{activity.userId?.name || activity.user?.name || 'Unknown athlete'}</td><td>{activity.durationMinutes ? `${activity.durationMinutes} min` : 'Not recorded'}</td><td>{activity.calories ? `${activity.calories} kcal` : 'Not recorded'}</td><td>{displayDate(activity.recordedAt || activity.createdAt)}</td></tr>)}</tbody></table></div>
      {!error && activities.length === 0 && <p className="text-secondary mt-3">No activities found.</p>}
    </section>
  );
}

export default Activities;
