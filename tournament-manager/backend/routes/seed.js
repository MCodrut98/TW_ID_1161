const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Team = require('../models/Team');
const Tournament = require('../models/Tournament');

router.post('/demo', auth, async (req, res) => {
  try {
    const userId = req.userId;

    const teamNames = ['TW Wolves', 'CS2 Titans', 'Valorant Vortex'];
    const teams = [];

    for (const name of teamNames) {
      let team = await Team.findOne({ name, captain: userId });
      if (!team) {
        team = new Team({
          name,
          description: `Demo team: ${name}`,
          captain: userId,
          members: [userId]
        });
        await team.save();
      }
      teams.push(team);
    }

    const now = new Date();
    const tournamentsSeed = [
      {
        name: 'TW CS2 Open',
        description: 'Demo CS2 tournament',
        gameName: 'Counter-Strike 2',
        startDate: new Date(now.getTime() + 86400000),
        endDate: new Date(now.getTime() + 2 * 86400000),
        maxTeams: 8,
        format: 'single-elimination'
      },
      {
        name: 'TW Valorant Cup',
        description: 'Demo Valorant tournament',
        gameName: 'Valorant',
        startDate: new Date(now.getTime() + 3 * 86400000),
        endDate: new Date(now.getTime() + 4 * 86400000),
        maxTeams: 16,
        format: 'double-elimination'
      }
    ];

    const tournaments = [];
    for (const seed of tournamentsSeed) {
      let tournament = await Tournament.findOne({ name: seed.name, organizer: userId });
      if (!tournament) {
        tournament = new Tournament({
          ...seed,
          organizer: userId,
          teams: teams.map((t) => t._id)
        });
        await tournament.save();
      }
      tournaments.push(tournament);
    }

    res.json({
      message: 'Demo data ready',
      teams,
      tournaments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
