import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection(leaderboardEndpoint, controller.signal).then(setEntries).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <p className="text-uppercase small fw-semibold text-primary mb-1">Weekly challenge</p><h1 className="h2 mb-4">Leaderboard</h1>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="list-group shadow-sm">{entries.map((entry, index) => <div className="list-group-item d-flex align-items-center gap-3 py-3" key={entry._id || entry.id || entry.userId?._id}><span className="badge rounded-pill text-bg-primary">{entry.rank || index + 1}</span><div className="flex-grow-1"><div className="fw-semibold">{entry.userId?.name || entry.user?.name || 'Unknown athlete'}</div><small className="text-secondary">{entry.period || 'weekly'} challenge</small></div><strong>{entry.points || 0} pts</strong></div>)}</div>
      {!error && entries.length === 0 && <p className="text-secondary mt-3">No leaderboard entries found.</p>}
    </section>
  );
}

export default Leaderboard;
