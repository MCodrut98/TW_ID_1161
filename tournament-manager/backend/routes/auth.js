const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Team = require('../models/Team');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    user = new User({ username, email, password });
    await user.save();

    const now = new Date();
    const names = [
      'Shadow League 2025',
      'Cyber Clash Invitational',
      'Neon City Showdown',
      'The Gauntlet Series',
      'Midnight Rumble',
      'Vortex Pro Circuit',
      'Titan Arena Championship',
      'Winter Split Major',
      'Pixel Glory Cup',
      'Apex Legends Risin'
    ];

    const tournamentDocs = names.map((name, index) => ({
      name,
      description: `Auto-created tournament for ${username}`,
      gameName: 'Custom',
      organizer: user._id,
      startDate: new Date(now.getTime() + (index + 1) * 86400000),
      endDate: new Date(now.getTime() + (index + 2) * 86400000),
      maxTeams: 16,
      format: 'single-elimination'
    }));

    await Tournament.insertMany(tournamentDocs);

    const teamNames = [
      'Crimson Vipers',
      'Velocity Gaming',
      'Shadow Legion',
      'Titan Esports',
      'Midnight Suns',
      'Apex Predators',
      'Quantum Logic',
      'Iron Wolves',
      'Chaos Theory',
      'Silent Storm',
      'Neon Knights',
      'Zenith Division',
      'High Ping Heroes',
      '404 Skill Not Found',
      'The Carry Potters',
      'Tactical Feeders',
      'Lag Switch Legion',
      'Keyboard Warriors',
      'Rage Quitters',
      'Ctrl Alt Defeat'
    ];

    const teamDocs = teamNames.map((name) => ({
      name,
      description: `Auto-created team for ${username}`,
      captain: user._id,
      members: [user._id]
    }));

    await Team.insertMany(teamDocs);
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    const existingCount = await Tournament.countDocuments({ organizer: user._id });
    if (existingCount === 0) {
      const now = new Date();
      const names = [
        'Shadow League 2025',
        'Cyber Clash Invitational',
        'Neon City Showdown',
        'The Gauntlet Series',
        'Midnight Rumble',
        'Vortex Pro Circuit',
        'Titan Arena Championship',
        'Winter Split Major',
        'Pixel Glory Cup',
        'Apex Legends Risin'
      ];

      const tournamentDocs = names.map((name, index) => ({
        name,
        description: `Auto-created tournament for ${user.username}`,
        gameName: 'Custom',
        organizer: user._id,
        startDate: new Date(now.getTime() + (index + 1) * 86400000),
        endDate: new Date(now.getTime() + (index + 2) * 86400000),
        maxTeams: 16,
        format: 'single-elimination'
      }));

      await Tournament.insertMany(tournamentDocs);
    }

    const existingTeams = await Team.countDocuments({ captain: user._id });
    if (existingTeams === 0) {
      const teamNames = [
        'Crimson Vipers',
        'Velocity Gaming',
        'Shadow Legion',
        'Titan Esports',
        'Midnight Suns',
        'Apex Predators',
        'Quantum Logic',
        'Iron Wolves',
        'Chaos Theory',
        'Silent Storm',
        'Neon Knights',
        'Zenith Division',
        'High Ping Heroes',
        '404 Skill Not Found',
        'The Carry Potters',
        'Tactical Feeders',
        'Lag Switch Legion',
        'Keyboard Warriors',
        'Rage Quitters',
        'Ctrl Alt Defeat'
      ];

      const teamDocs = teamNames.map((name) => ({
        name,
        description: `Auto-created team for ${user.username}`,
        captain: user._id,
        members: [user._id]
      }));

      await Team.insertMany(teamDocs);
    }

    const combinedTeam = await Team.findOne({
      captain: user._id,
      name: 'Zenith DivisionHigh Ping Heroes'
    });
    if (combinedTeam) {
      combinedTeam.name = 'Zenith Division';
      await combinedTeam.save();

      const highPingExists = await Team.findOne({
        captain: user._id,
        name: 'High Ping Heroes'
      });
      if (!highPingExists) {
        await Team.create({
          name: 'High Ping Heroes',
          description: `Auto-created team for ${user.username}`,
          captain: user._id,
          members: [user._id]
        });
      }
    }
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
