const express = require('express');
const router = express.Router();
const axios = require('axios');
const Game = require('../models/Game');
const auth = require('../middleware/auth');

// Get all games from database
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find({}).limit(50);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search games from IGDB
router.get('/search/:query', auth, async (req, res) => {
  try {
    const query = req.params.query;
    
    const response = await axios.post('https://api.igdb.com/v4/games', 
      `search "${query}"; fields name, cover.url, platforms.name, genres.name, release_dates.y;`,
      {
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search IGDB' });
  }
});

// Add game to database
router.post('/', auth, async (req, res) => {
  try {
    const { igdbId, name, platforms, genres } = req.body;
    
    let game = await Game.findOne({ igdbId });
    
    if (game) {
      return res.status(400).json({ error: 'Game already exists' });
    }
    
    game = new Game({
      igdbId,
      name,
      platforms,
      genres
    });
    
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get popular esports games
router.get('/esports/popular', auth, async (req, res) => {
  try {
    const games = await Game.find({ esportPopular: true }).limit(20);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
