import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('users', controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><p className="text-uppercase small fw-semibold text-primary mb-1">Community</p><h1 className="h2 mb-0">Athletes</h1></div>
        <span className="badge text-bg-light">{users.length} members</span>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">
        {users.map((user) => <article className="col-md-6 col-xl-3" key={user._id || user.id || user.email}><div className="card h-100 border-0 shadow-sm"><div className="card-body"><div className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 48, height: 48 }}>{user.name?.charAt(0) || '?'}</div><h2 className="h5">{user.name || 'Unnamed athlete'}</h2><p className="text-secondary mb-0">{user.email || 'No email recorded'}</p></div></div></article>)}
      </div>
      {!error && users.length === 0 && <p className="text-secondary">No athletes found.</p>}
    </section>
  );
}

export default Users;
