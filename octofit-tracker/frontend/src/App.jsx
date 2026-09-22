import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <main className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Track activities, teams, leaderboards, and personalized workouts.</p>
    </main>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
