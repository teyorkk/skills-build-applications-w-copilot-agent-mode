import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchCollection('/api/workouts/', controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message);
    });
    return () => controller.abort();
  }, []);

  return (
    <section>
      <p className="text-uppercase small fw-semibold text-primary mb-1">Personalized library</p><h1 className="h2 mb-4">Workouts</h1>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">{workouts.map((workout) => <article className="col-md-6 col-xl-4" key={workout._id || workout.id || workout.title}><div className="card h-100 border-0 shadow-sm"><div className="card-body"><div className="d-flex justify-content-between gap-2 mb-3"><span className="badge text-bg-light">{workout.category || 'Training'}</span><span className="text-secondary small">{workout.durationMinutes ? `${workout.durationMinutes} min` : ''}</span></div><h2 className="h5">{workout.title || 'Untitled workout'}</h2><p className="text-secondary text-capitalize">{workout.difficulty || 'All levels'}</p><ul className="small text-secondary mb-0">{(workout.exercises || []).slice(0, 4).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></div></article>)}</div>
      {!error && workouts.length === 0 && <p className="text-secondary">No workouts found.</p>}
    </section>
  );
}

export default Workouts;
