import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>Game Tournament Manager</h1>
        <p>Organize and manage your esports tournaments with ease</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/tournaments')} className="btn-primary">
            Browse Tournaments
          </button>
          <button onClick={() => navigate('/create-tournament')} className="btn-secondary">
            Create Tournament
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Tournament Management</h3>
            <p>Create and manage tournaments with multiple formats</p>
          </div>
          <div className="feature-card">
            <h3>Team Management</h3>
            <p>Build teams and manage your squad members</p>
          </div>
          <div className="feature-card">
            <h3>Match Scheduling</h3>
            <p>Schedule and track matches automatically</p>
          </div>
          <div className="feature-card">
            <h3>IGDB Integration</h3>
            <p>Access thousands of games from Internet Game Database</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Updates</h3>
            <p>Get live updates on tournament progress</p>
          </div>
          <div className="feature-card">
            <h3>Player Profiles</h3>
            <p>Track player statistics and achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
