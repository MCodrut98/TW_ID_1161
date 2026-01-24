# API Reference

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except login/register) require JWT token in Authorization header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response: 201
{
  "token": "string",
  "user": {
    "id": "ObjectId",
    "username": "string",
    "email": "string"
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: 200
{
  "token": "string",
  "user": {
    "id": "ObjectId",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}
```

---

## User Endpoints

### Get All Users
```
GET /users

Response: 200
[{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "teams": [],
  "tournaments": []
}]
```

### Get User Profile
```
GET /users/:id

Response: 200
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "avatar": "string",
  "bio": "string",
  "teams": [{...}],
  "tournaments": [{...}]
}
```

### Update User Profile
```
PUT /users/:id
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "bio": "string",
  "avatar": "string"
}

Response: 200
{...updated user object...}
```

---

## Tournament Endpoints

### Get All Tournaments
```
GET /tournaments

Response: 200
[{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "game": {...},
  "organizer": {...},
  "startDate": "Date",
  "endDate": "Date",
  "maxTeams": "number",
  "teams": [],
  "status": "string",
  "format": "string"
}]
```

### Get Tournament by ID
```
GET /tournaments/:id

Response: 200
{...tournament object...}
```

### Create Tournament
```
POST /tournaments
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "string",
  "description": "string",
  "game": "ObjectId",
  "startDate": "Date",
  "endDate": "Date",
  "maxTeams": "number",
  "format": "string"
}

Response: 201
{...created tournament object...}
```

### Update Tournament
```
PUT /tournaments/:id
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "string",
  "description": "string",
  "status": "string",
  ...
}

Response: 200
{...updated tournament object...}
```

### Delete Tournament
```
DELETE /tournaments/:id
Authorization: Bearer {token}

Response: 200
{
  "message": "Tournament deleted"
}
```

---

## Team Endpoints

### Get All Teams
```
GET /teams

Response: 200
[{
  "_id": "ObjectId",
  "name": "string",
  "logo": "string",
  "captain": {...},
  "members": [...],
  "stats": {...}
}]
```

### Get Team by ID
```
GET /teams/:id

Response: 200
{...team object...}
```

### Create Team
```
POST /teams
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "string",
  "description": "string",
  "logo": "string"
}

Response: 201
{...created team object...}
```

### Add Member to Team
```
POST /teams/:id/members
Content-Type: application/json
Authorization: Bearer {token}

{
  "userId": "ObjectId"
}

Response: 200
{...updated team object...}
```

---

## Match Endpoints

### Get All Matches
```
GET /matches

Response: 200
[{
  "_id": "ObjectId",
  "tournament": {...},
  "team1": {...},
  "team2": {...},
  "scheduledDate": "Date",
  "status": "string",
  "result": {...}
}]
```

### Get Tournament Matches
```
GET /matches/tournament/:tournamentId

Response: 200
[{...match objects...}]
```

### Create Match
```
POST /matches
Content-Type: application/json
Authorization: Bearer {token}

{
  "tournament": "ObjectId",
  "team1": "ObjectId",
  "team2": "ObjectId",
  "scheduledDate": "Date",
  "round": "number"
}

Response: 201
{...created match object...}
```

### Update Match Result
```
PUT /matches/:id
Content-Type: application/json
Authorization: Bearer {token}

{
  "status": "completed",
  "result": {
    "winner": "ObjectId",
    "score1": "number",
    "score2": "number"
  }
}

Response: 200
{...updated match object...}
```

---

## Game Endpoints

### Get Games from Database
```
GET /games

Response: 200
[{
  "_id": "ObjectId",
  "igdbId": "number",
  "name": "string",
  "cover": "string",
  "platforms": [],
  "genres": []
}]
```

### Search Games on IGDB
```
GET /games/search/:query

Response: 200
[{
  "id": "number",
  "name": "string",
  "cover": {...},
  "platforms": [],
  "genres": []
}]
```

### Add Game to Database
```
POST /games
Content-Type: application/json
Authorization: Bearer {token}

{
  "igdbId": "number",
  "name": "string",
  "platforms": ["string"],
  "genres": ["string"]
}

Response: 201
{...created game object...}
```

### Get Popular Esports Games
```
GET /games/esports/popular

Response: 200
[{...game objects...}]
```

---

## Error Responses

### 400 Bad Request
```
{
  "error": "Description of validation error"
}
```

### 401 Unauthorized
```
{
  "error": "No token, authorization denied"
}
```

### 403 Forbidden
```
{
  "error": "Not authorized"
}
```

### 404 Not Found
```
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```
{
  "error": "Something went wrong!"
}
```
