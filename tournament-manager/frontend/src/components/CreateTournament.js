import React, { useState } from 'react';
import { tournamentsAPI, gamesAPI } from '../api';
import '../styles/CreateTournament.css';

function CreateTournament({ onTournamentCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    game: '',
    gameName: '',
    gameCover: '',
    startDate: '',
    endDate: '',
    maxTeams: 16,
    format: 'single-elimination'
  });
  const [games, setGames] = useState([]);
  const [gameQuery, setGameQuery] = useState('');
  const [gameLoading, setGameLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGameSearch = async () => {
    if (!gameQuery.trim()) {
      setGames([]);
      return;
    }

    setGameLoading(true);
    setError('');

    try {
      const response = await gamesAPI.search(gameQuery.trim());
      setGames(response.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search IGDB');
    } finally {
      setGameLoading(false);
    }
  };

  const getCoverUrl = (coverUrl) => {
    if (!coverUrl) return '';
    const normalized = coverUrl.startsWith('//') ? `https:${coverUrl}` : coverUrl;
    return normalized.replace('t_thumb', 't_cover_big');
  };

  const handleGameSelect = (game) => {
    setFormData({
      ...formData,
      game: String(game.id),
      gameName: game.name,
      gameCover: getCoverUrl(game.cover?.url)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await tournamentsAPI.create(formData);
      setFormData({
        name: '',
        description: '',
        game: '',
        gameName: '',
        gameCover: '',
        startDate: '',
        endDate: '',
        maxTeams: 16,
        format: 'single-elimination'
      });
      setGameQuery('');
      setGames([]);
      onTournamentCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tournament');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-tournament-container">
      <h2>Create New Tournament</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tournament Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="game-search">Game (IGDB):</label>
          <div className="game-search">
            <input
              id="game-search"
              type="text"
              value={gameQuery}
              onChange={(e) => setGameQuery(e.target.value)}
              placeholder="Search game (e.g., Counter-Strike 2)"
            />
            <button
              type="button"
              className="btn-search"
              onClick={handleGameSearch}
              disabled={gameLoading}
            >
              {gameLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {games.length > 0 && (
            <ul className="game-results">
              {games.slice(0, 8).map((game) => (
                <li key={game.id}>
                  <button
                    type="button"
                    className={formData.game === String(game.id) ? 'selected' : ''}
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
          {formData.gameCover && (
            <div className="selected-game">
              <img src={formData.gameCover} alt={formData.gameName} />
              <span>{formData.gameName}</span>
            </div>
          )}
          <input
            id="game"
            type="text"
            name="game"
            value={formData.game}
            onChange={handleChange}
            placeholder="Selected game ID (auto)"
            required
            readOnly
          />
          <input
            id="gameName"
            type="text"
            name="gameName"
            value={formData.gameName}
            onChange={handleChange}
            placeholder="Selected game name (auto)"
            required
            readOnly
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              id="endDate"
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="maxTeams">Max Teams:</label>
            <input
              id="maxTeams"
              type="number"
              name="maxTeams"
              value={formData.maxTeams}
              onChange={handleChange}
              min="2"
            />
          </div>

          <div className="form-group">
            <label htmlFor="format">Format:</label>
            <select name="format" value={formData.format} onChange={handleChange}>
              <option value="single-elimination">Single Elimination</option>
              <option value="double-elimination">Double Elimination</option>
              <option value="round-robin">Round Robin</option>
              <option value="swiss">Swiss</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Tournament'}
        </button>
      </form>
    </div>
  );
}

export default CreateTournament;
