import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gamesAPI, tournamentsAPI, teamsAPI } from '../api';
import '../styles/TournamentDetails.css';

function TournamentDetails() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [gameName, setGameName] = useState('');
  const [gameCover, setGameCover] = useState('');
  const [gameQuery, setGameQuery] = useState('');
  const [gameResults, setGameResults] = useState([]);
  const [gameLoading, setGameLoading] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const getCoverUrl = (coverUrl) => {
    if (!coverUrl) return '';
    const normalized = coverUrl.startsWith('//') ? `https:${coverUrl}` : coverUrl;
    return normalized.replace('t_thumb', 't_cover_big');
  };

  const loadData = useCallback(async () => {
    try {
      const [tournamentRes, teamsRes] = await Promise.all([
        tournamentsAPI.getOne(id),
        teamsAPI.getAll()
      ]);
      setTournament(tournamentRes.data);
      setGameName(tournamentRes.data.gameName || tournamentRes.data.game?.name || '');
      setGameCover(getCoverUrl(tournamentRes.data.gameCover || tournamentRes.data.game?.cover || ''));
      setSelectedGameId(tournamentRes.data.game?._id || '');
      setTeams(teamsRes.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tournament');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleGameUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const payload = selectedGameId
        ? { game: selectedGameId, gameName, gameCover }
        : { gameName, gameCover };
      const res = await tournamentsAPI.update(id, payload);
      setTournament(res.data);
      setMessage('Game updated');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update game');
    }
  };

  const handleGameSearch = async () => {
    if (!gameQuery.trim()) {
      setGameResults([]);
      return;
    }
    setGameLoading(true);
    setError('');
    try {
      const res = await gamesAPI.search(gameQuery.trim());
      setGameResults(res.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search IGDB');
    } finally {
      setGameLoading(false);
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGameId(String(game.id));
    setGameName(game.name);
    setGameCover(getCoverUrl(game.cover?.url));
  };

  const handleAddTeam = async () => {
    setMessage('');
    setError('');
    try {
      if (!selectedTeamId) {
        setError('Select a team to add');
        return;
      }
      const res = await tournamentsAPI.addTeam(id, selectedTeamId);
      setTournament(res.data);
      setSelectedTeamId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add team');
    }
  };

  const handleRemoveTeam = async (teamId) => {
    setMessage('');
    setError('');
    try {
      const res = await tournamentsAPI.removeTeam(id, teamId);
      setTournament(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove team');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!tournament) return <div className="error-message">Tournament not found</div>;

  const teamIds = new Set((tournament.teams || []).map((t) => t._id));
  const availableTeams = teams.filter((t) => !teamIds.has(t._id));

  return (
    <div className="tournament-details">
      <div className="header">
        <h2>{tournament.name}</h2>
        <p>{tournament.description}</p>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="section">
        <h3>Game</h3>
        {gameCover && (
          <div className="selected-game">
            <img src={gameCover} alt={gameName || 'Game cover'} />
            <span>{gameName}</span>
          </div>
        )}
        <form className="inline-form" onSubmit={handleGameUpdate}>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Game name"
            required
          />
          <button type="submit">Update</button>
        </form>
        <div className="game-search">
          <input
            type="text"
            value={gameQuery}
            onChange={(e) => setGameQuery(e.target.value)}
            placeholder="Search IGDB (e.g., Counter-Strike 2)"
          />
          <button type="button" onClick={handleGameSearch} disabled={gameLoading}>
            {gameLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {gameResults.length > 0 && (
          <ul className="game-results">
            {gameResults.slice(0, 8).map((game) => (
              <li key={game.id}>
                <button
                  type="button"
                  className={selectedGameId === String(game.id) ? 'selected' : ''}
                  onClick={() => handleGameSelect(game)}
                >
                  {game.cover?.url && (
                    <img
                      src={getCoverUrl(game.cover.url)}
                      alt={game.name}
                      className="game-cover"
                    />
                  )}
                  <span>{game.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section">
        <h3>Teams in tournament</h3>
        {tournament.teams.length === 0 ? (
          <div>No teams added.</div>
        ) : (
          <ul className="team-list">
            {tournament.teams.map((team) => (
              <li key={team._id}>
                <span>{team.name}</span>
                <button className="btn-danger" onClick={() => handleRemoveTeam(team._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section">
        <h3>Add team</h3>
        {availableTeams.length === 0 ? (
          <div>No available teams to add.</div>
        ) : (
          <div className="inline-form">
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
            >
              <option value="">Select a team...</option>
              {availableTeams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddTeam}>
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TournamentDetails;
