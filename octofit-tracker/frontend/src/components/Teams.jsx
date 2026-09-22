import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/teams/', controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <p className="text-uppercase small fw-semibold text-primary mb-1">Competition</p><h1 className="h2 mb-4">Teams</h1>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">
        {teams.map((team) => <article className="col-md-6" key={team._id || team.id || team.name}><div className="card h-100 border-0 shadow-sm"><div className="card-body"><div className="d-flex align-items-center gap-3"><span className="rounded-circle" style={{ width: 16, height: 16, backgroundColor: team.color || '#1f7a8c' }} /><h2 className="h5 mb-0">{team.name || 'Unnamed team'}</h2></div><p className="text-secondary mt-3 mb-0">{team.description || 'No team description available.'}</p></div></div></article>)}
      </div>
      {!error && teams.length === 0 && <p className="text-secondary">No teams found.</p>}
    </section>
  );
}

export default Teams;
