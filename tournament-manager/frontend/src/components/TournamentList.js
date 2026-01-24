import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tournamentsAPI } from '../api';
import '../styles/Tournaments.css';

function TournamentList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getCoverUrl = (coverUrl) => {
    if (!coverUrl) return '';
    const normalized = coverUrl.startsWith('//') ? `https:${coverUrl}` : coverUrl;
    return normalized.replace('t_thumb', 't_cover_big');
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view tournaments');
      setLoading(false);
      return;
    }
    try {
      const response = await tournamentsAPI.getAll();
      setTournaments(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please login to view tournaments');
      } else {
        setError('Failed to fetch tournaments');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tournamentId) => {
    if (!window.confirm('Delete this tournament?')) return;
    try {
      await tournamentsAPI.delete(tournamentId);
      setTournaments((prev) => prev.filter((t) => t._id !== tournamentId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete tournament');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="tournaments-container">
      <div className="list-header">
        <h2>Tournaments</h2>
        <button className="btn-primary" onClick={() => navigate('/create-tournament')}>
          Create Tournament
        </button>
      </div>
      <div className="tournaments-grid">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="tournament-card">
            {(tournament.gameCover || tournament.game?.cover) && (
              <img
                src={getCoverUrl(tournament.gameCover || tournament.game?.cover)}
                alt={tournament.gameName || tournament.game?.name || 'Game cover'}
                className="tournament-cover"
              />
            )}
            <h3>{tournament.name}</h3>
            <p>{tournament.description}</p>
            <div className="tournament-info">
              <span>Game: {tournament.gameName || tournament.game?.name || 'N/A'}</span>
              <span>Status: {tournament.status}</span>
              <span>Format: {tournament.format}</span>
              <span>Teams: {tournament.teams.length}/{tournament.maxTeams}</span>
            </div>
            <div className="card-actions">
              <button onClick={() => navigate(`/tournaments/${tournament._id}`)}>
                View Details
              </button>
              <button className="btn-danger" onClick={() => handleDelete(tournament._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentList;
