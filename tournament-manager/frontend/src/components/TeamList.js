import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamsAPI } from '../api';
import '../styles/Teams.css';

function TeamList() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getAll();
      setTeams(response.data);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teamId) => {
    if (!window.confirm('Delete this team?')) return;
    try {
      await teamsAPI.delete(teamId);
      setTeams((prev) => prev.filter((team) => team._id !== teamId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete team');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="teams-container">
      <div className="list-header">
        <h2>Teams</h2>
        <button className="btn-primary" onClick={() => navigate('/create-team')}>
          Create Team
        </button>
      </div>
      <div className="teams-grid">
        {teams.map((team) => (
          <div key={team._id} className="team-card">
            {team.logo && <img src={team.logo} alt={team.name} />}
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <div className="team-stats">
              <span>Members: {team.members.length}</span>
              <span>W: {team.stats.wins} L: {team.stats.losses}</span>
            </div>
            <div className="card-actions">
              <button onClick={() => navigate(`/teams/${team._id}`)}>View Team</button>
              <button className="btn-danger" onClick={() => handleDelete(team._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;
