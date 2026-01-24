# Database Models Documentation

## User Model

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  firstName: String,
  lastName: String,
  avatar: String,
  bio: String,
  role: String (user, organizer, admin),
  teams: [ObjectId],
  tournaments: [ObjectId],
  createdAt: Date
}
```

## Tournament Model

```javascript
{
  name: String (required),
  description: String,
  game: ObjectId (required, ref: Game),
  organizer: ObjectId (required, ref: User),
  startDate: Date (required),
  endDate: Date (required),
  maxTeams: Number (default: 16),
  teams: [ObjectId],
  status: String (planning, registration, active, completed, cancelled),
  format: String (single-elimination, double-elimination, round-robin, swiss),
  prizePool: Number,
  prizes: [{position, reward}],
  rules: String,
  banner: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Team Model

```javascript
{
  name: String (required),
  description: String,
  logo: String,
  captain: ObjectId (required, ref: User),
  members: [ObjectId],
  tournaments: [ObjectId],
  stats: {
    wins: Number,
    losses: Number,
    draws: Number,
    totalMatches: Number
  },
  createdAt: Date
}
```

## Match Model

```javascript
{
  tournament: ObjectId (required, ref: Tournament),
  team1: ObjectId (required, ref: Team),
  team2: ObjectId (required, ref: Team),
  scheduledDate: Date,
  status: String (scheduled, in-progress, completed, cancelled),
  result: {
    winner: ObjectId,
    score1: Number,
    score2: Number
  },
  round: Number,
  bracket: String (main, losers, etc),
  notes: String,
  createdAt: Date
}
```

## Game Model

```javascript
{
  igdbId: Number (required, unique),
  name: String (required),
  cover: String,
  platforms: [String],
  genres: [String],
  releaseDate: Date,
  esportPopular: Boolean,
  tournaments: [ObjectId],
  lastUpdated: Date
}
```
