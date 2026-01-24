import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TournamentList from './components/TournamentList';
import CreateTournament from './components/CreateTournament';
import TournamentDetails from './components/TournamentDetails';
import TeamList from './components/TeamList';
import CreateTeam from './components/CreateTeam';
import TeamDetails from './components/TeamDetails';
import Profile from './components/Profile';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          Tournament Manager
        </Link>
        <div className="nav-links">
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/teams">Teams</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <span className="user-info">Hello, {user.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/tournaments" element={<TournamentList />} />
          <Route path="/tournaments/:id" element={<TournamentDetails />} />
          <Route
            path="/create-tournament"
            element={
              user ? (
                <CreateTournament onTournamentCreated={() => navigate('/tournaments')} />
              ) : (
                <div>Please login to create a tournament</div>
              )
            }
          />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route
            path="/create-team"
            element={
              user ? (
                <CreateTeam onTeamCreated={() => navigate('/teams')} />
              ) : (
                <div>Please login to create a team</div>
              )
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Tournament Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
