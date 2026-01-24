import React, { useState } from 'react';
import { teamsAPI } from '../api';
import '../styles/CreateTeam.css';

function CreateTeam({ onTeamCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const response = await teamsAPI.create(formData);
      setFormData({ name: '', description: '', logo: '' });
      onTeamCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-team-container">
      <h2>Create New Team</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Team Name:</label>
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
          <label htmlFor="logo">Logo URL:</label>
          <input
            id="logo"
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
}

export default CreateTeam;
