# Game Tournament Organization System with IGDB Integration

A full-stack web application for organizing and managing esports tournaments integrated with the Internet Game Database (IGDB) API.

## Features

- **User Authentication**: Register and login with JWT-based authentication
- **Tournament Management**: Create, manage, and schedule tournaments
- **Team Management**: Build and manage gaming teams
- **Match Scheduling**: Automatic match scheduling with multiple tournament formats
- **IGDB Integration**: Access and search thousands of games from IGDB
- **Real-time Updates**: Track tournament progress and player statistics
- **User Profiles**: Maintain player profiles with statistics
- **Multiple Tournament Formats**: Single Elimination, Double Elimination, Round Robin, Swiss

## Project Structure

```
tournament-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Tournament.js
│   │   ├── Team.js
│   │   ├── Match.js
│   │   └── Game.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── tournaments.js
│   │   ├── teams.js
│   │   ├── matches.js
│   │   └── games.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── TournamentList.js
│   │   │   ├── CreateTournament.js
│   │   │   ├── TeamList.js
│   │   │   └── CreateTeam.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── Tournaments.css
│   │   │   ├── CreateTournament.css
│   │   │   ├── Teams.css
│   │   │   └── CreateTeam.css
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── docs/
    └── README.md
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
   - MongoDB URI
   - IGDB API credentials (get from https://api.igdb.com/)
   - JWT secret

5. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `GET /api/tournaments/:id` - Get tournament details
- `POST /api/tournaments` - Create tournament
- `PUT /api/tournaments/:id` - Update tournament
- `DELETE /api/tournaments/:id` - Delete tournament

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team details
- `POST /api/teams` - Create team
- `POST /api/teams/:id/members` - Add member to team

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/tournament/:tournamentId` - Get tournament matches
- `POST /api/matches` - Create match
- `PUT /api/matches/:id` - Update match result

### Games
- `GET /api/games` - Get games from database
- `GET /api/games/search/:query` - Search games on IGDB
- `POST /api/games` - Add game to database
- `GET /api/games/esports/popular` - Get popular esports games

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tournament-manager
IGDB_CLIENT_ID=your_client_id
IGDB_ACCESS_TOKEN=your_access_token
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- IGDB API Integration
- Bcrypt for password hashing

### Frontend
- React 18
- React Router
- Axios for API calls
- CSS3

## Features Implementation

### 1. User Management
- User registration and login
- JWT-based authentication
- User profiles with team and tournament associations

### 2. Tournament System
- Create tournaments with multiple formats
- Manage tournament status and teams
- Support for prizes and rules

### 3. Team Management
- Create and manage gaming teams
- Add team members
- Track team statistics (wins, losses, draws)

### 4. Match Scheduling
- Automatic match generation
- Support for different tournament formats
- Match result tracking

### 5. IGDB Integration
- Search for games
- Browse game information
- Link tournaments to specific games

## Future Enhancements

- Real-time notifications with WebSockets
- Advanced analytics and statistics
- Streaming integration
- Payment gateway for prize pools
- Mobile app
- Social media integration
- Rating and ranking system
- Spectator mode
- Replay system

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start the backend (from backend directory):
```bash
npm run dev
```

3. Start the frontend (from frontend directory):
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@tournamentmanager.com or create an issue on GitHub.

## Acknowledgments

- IGDB API for game database
- React community
- Node.js community
