import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { teamsAPI } from '../api';
import '../styles/TeamDetails.css';

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [memberIdentifier, setMemberIdentifier] = useState('');
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });

  const loadTeam = useCallback(async () => {
    try {
      const res = await teamsAPI.getOne(id);
      setTeam(res.data);
      setStats({
        wins: res.data.stats?.wins ?? 0,
        losses: res.data.stats?.losses ?? 0,
        draws: res.data.stats?.draws ?? 0
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load team');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const handleAddMember = async () => {
    setError('');
    setMessage('');
    if (!memberIdentifier.trim()) return;
    try {
      const res = await teamsAPI.addMember(id, memberIdentifier.trim());
      setTeam(res.data);
      setMemberIdentifier('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add member');
    }
  };

  const handleRemoveMember = async (memberIdToRemove) => {
    setError('');
    setMessage('');
    try {
      const res = await teamsAPI.removeMember(id, memberIdToRemove);
      setTeam(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove member');
    }
  };

  const handleUpdateStats = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = {
        wins: Number(stats.wins),
        losses: Number(stats.losses),
        draws: Number(stats.draws)
      };
      const res = await teamsAPI.updateStats(id, payload);
      setTeam(res.data);
      setMessage('Stats updated');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update stats');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!team) return <div className="error-message">Team not found</div>;

  return (
    <div className="team-details">
      <div className="header">
        <h2>{team.name}</h2>
        <p>{team.description}</p>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="section">
        <h3>Members</h3>
        {team.members?.length ? (
          <ul className="member-list">
            {team.members.map((member) => (
              <li key={member._id}>
                <span>{member.username || member.email || member._id}</span>
                <button
                  className="btn-danger"
                  onClick={() => handleRemoveMember(member._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>No members.</div>
        )}

        <div className="inline-form">
          <input
            type="text"
            placeholder="Username or email to add"
            value={memberIdentifier}
            onChange={(e) => setMemberIdentifier(e.target.value)}
          />
          <button type="button" onClick={handleAddMember}>
            Add Member
          </button>
        </div>
      </div>

      <div className="section">
        <h3>Stats</h3>
        <form className="stats-form" onSubmit={handleUpdateStats}>
          <div className="form-group">
            <label htmlFor="wins">Wins</label>
            <input
              id="wins"
              type="number"
              min="0"
              value={stats.wins}
              onChange={(e) => setStats({ ...stats, wins: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="losses">Losses</label>
            <input
              id="losses"
              type="number"
              min="0"
              value={stats.losses}
              onChange={(e) => setStats({ ...stats, losses: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="draws">Draws</label>
            <input
              id="draws"
              type="number"
              min="0"
              value={stats.draws}
              onChange={(e) => setStats({ ...stats, draws: e.target.value })}
            />
          </div>
          <button type="submit">Update Stats</button>
        </form>
      </div>
    </div>
  );
}

export default TeamDetails;
