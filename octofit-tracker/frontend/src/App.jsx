import { NavLink, Route, Routes } from 'react-router-dom';
import { API_BASE_URL } from './api.js';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function Home() {
  return <section className="py-5"><p className="text-uppercase small fw-semibold text-primary mb-2">Your training command center</p><h1 className="display-5 fw-semibold">Make every session count.</h1><p className="lead text-secondary col-lg-7">Track your momentum, find your people, and keep the next workout within reach.</p><div className="row g-3 mt-4">{[['/activities', 'Logbook', 'Review recent movement.'], ['/leaderboard', 'Leaderboard', 'See how your team is moving.'], ['/workouts', 'Workout library', 'Choose your next challenge.']].map(([path, title, description]) => <NavLink className="col-md-4 text-decoration-none" to={path} key={path}><div className="card h-100 border-0 shadow-sm"><div className="card-body"><h2 className="h5 text-dark">{title}</h2><p className="text-secondary mb-0">{description}</p></div></div></NavLink>)}</div></section>;
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container py-2">
          <NavLink className="navbar-brand fw-semibold" to="/">OctoFit Tracker</NavLink>
          <div className="navbar-nav ms-auto gap-lg-2">
            <NavLink className="nav-link" to="/users">Athletes</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <div className="container py-4">
        <p className="small text-secondary mb-4">API: {API_BASE_URL}</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
