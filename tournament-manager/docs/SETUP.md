# Tournament Manager - Setup Guide

## Quick Start

### 1. Install Node.js
Download and install Node.js from https://nodejs.org/

### 2. Clone/Setup Project

```bash
cd tournament-manager
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tournament-manager
IGDB_CLIENT_ID=your_igdb_client_id
IGDB_ACCESS_TOKEN=your_igdb_access_token
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm start
```

### 5. MongoDB Setup

Download MongoDB Community Edition from https://www.mongodb.com/try/download/community

On Windows:
```bash
mongod
```

## API Documentation

All API requests should include the Authorization header (except for login/register):
```
Authorization: Bearer {token}
```

### Endpoints Summary

**Authentication:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

**Tournaments:**
- GET `/api/tournaments` - List all tournaments
- POST `/api/tournaments` - Create tournament
- GET `/api/tournaments/:id` - Get tournament details
- PUT `/api/tournaments/:id` - Update tournament
- DELETE `/api/tournaments/:id` - Delete tournament

**Teams:**
- GET `/api/teams` - List all teams
- POST `/api/teams` - Create team
- GET `/api/teams/:id` - Get team details
- POST `/api/teams/:id/members` - Add team member

**Games:**
- GET `/api/games` - Get games from database
- GET `/api/games/search/:query` - Search IGDB
- POST `/api/games` - Add game to database

**Matches:**
- GET `/api/matches` - List all matches
- POST `/api/matches` - Create match
- PUT `/api/matches/:id` - Update match result

## Getting IGDB API Credentials

1. Go to https://api.igdb.com/
2. Register for a free account
3. Create a new application
4. Get your Client ID and Access Token
5. Add them to your `.env` file

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB service is running
- Check MONGODB_URI in .env file
- Default: `mongodb://localhost:27017/tournament-manager`

**IGDB API Error:**
- Verify Client ID and Access Token
- Check API rate limits
- Ensure Bearer token format in headers

**CORS Error:**
- Ensure CORS_ORIGIN in backend .env matches frontend URL
- Default: `http://localhost:3000`

**Port Already in Use:**
- Change PORT in backend `.env`
- Change port in frontend `npm start -- --port 3001`

## Project Features

✓ User Registration & Login
✓ Tournament Creation & Management
✓ Team Management
✓ Match Scheduling
✓ IGDB Game Integration
✓ Player Statistics
✓ Real-time Updates
✓ Multiple Tournament Formats

## Additional Resources

- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/
- IGDB API Docs: https://api-docs.igdb.com/

## Contact

For issues or questions, please open an issue on the project repository.
