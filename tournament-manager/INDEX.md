# 🎮 Tournament Manager - Project Index

## Welcome to Your Game Tournament Organization System!

This is a complete, production-ready full-stack web application for organizing esports tournaments with IGDB integration.

---

## 📖 Documentation Index

### 🚀 Getting Started
1. **[README.md](README.md)** - Start here! Project overview and features
2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick start commands and tips
3. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - What's included in this project

### 📚 Detailed Guides
4. **[docs/SETUP.md](docs/SETUP.md)** - Detailed installation instructions
5. **[docs/API.md](docs/API.md)** - Complete API reference with examples
6. **[docs/DATABASE.md](docs/DATABASE.md)** - Database schema documentation
7. **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment to production

---

## 🏗️ Project Structure

```
tournament-manager/
├── 📁 backend/
│   ├── 📁 models/               # Database schemas
│   │   ├── User.js             # User model
│   │   ├── Tournament.js        # Tournament model
│   │   ├── Team.js             # Team model
│   │   ├── Match.js            # Match model
│   │   └── Game.js             # Game model
│   ├── 📁 routes/               # API endpoints
│   │   ├── auth.js             # Authentication
│   │   ├── users.js            # User endpoints
│   │   ├── tournaments.js       # Tournament endpoints
│   │   ├── teams.js            # Team endpoints
│   │   ├── matches.js          # Match endpoints
│   │   └── games.js            # Game endpoints
│   ├── 📁 middleware/
│   │   └── auth.js             # JWT authentication
│   ├── server.js               # Express main server
│   ├── package.json            # Node dependencies
│   └── .env.example            # Configuration template
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   │   ├── Home.js         # Home page
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Register page
│   │   │   ├── TournamentList.js
│   │   │   ├── CreateTournament.js
│   │   │   ├── TeamList.js
│   │   │   └── CreateTeam.js
│   │   ├── 📁 styles/           # CSS styling
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── Tournaments.css
│   │   │   ├── CreateTournament.css
│   │   │   ├── Teams.css
│   │   │   └── CreateTeam.css
│   │   ├── api.js              # API client
│   │   ├── App.js              # Main React component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global CSS
│   └── package.json            # React dependencies
│
├── 📁 docs/
│   ├── README.md               # Full documentation
│   ├── SETUP.md               # Setup guide
│   ├── API.md                 # API reference
│   ├── DATABASE.md            # Database schemas
│   └── DEPLOYMENT.md          # Deployment guide
│
├── package.json               # Root configuration
├── setup.bat                  # Windows setup script
├── setup.sh                   # Mac/Linux setup script
├── .gitignore                # Git ignore file
├── README.md                 # Main readme
├── QUICK_REFERENCE.md        # Quick start guide
└── PROJECT_SUMMARY.md        # Project overview
```

---

## ⚡ Quick Start (3 Steps)

### Step 1: Setup
```bash
cd tournament-manager
.\setup.bat              # Windows
# or
bash setup.sh           # Mac/Linux
```

### Step 2: Configure
```bash
cd backend
copy .env.example .env  # Windows: edit with your credentials
# or
cp .env.example .env    # Mac/Linux: edit with your credentials
```

Add your IGDB API credentials to `.env`

### Step 3: Run
```bash
mongod                  # Terminal 1: Start MongoDB
npm run dev            # Terminal 2: Run both backend & frontend
```

**Access:** http://localhost:3000

---

## 🎯 Main Features

✅ **User Management**
- Registration & Login
- JWT Authentication
- User Profiles

✅ **Tournament System**
- Create tournaments
- Multiple formats (Single/Double Elimination, Round Robin, Swiss)
- Schedule and track tournaments
- Prize management

✅ **Team Management**
- Create teams
- Manage members
- Track team statistics

✅ **Match System**
- Automatic match creation
- Result tracking
- Bracket management

✅ **IGDB Integration**
- Search games database
- Browse game information
- Link tournaments to games

✅ **User Interface**
- Responsive design
- Modern UI
- Easy navigation

---

## 🔑 Key Technologies

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Frontend** | React 18, React Router, Axios |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **External API** | IGDB API |
| **Styling** | CSS3 |

---

## 📋 File Descriptions

### Root Level Files
- **README.md** - Main project documentation
- **QUICK_REFERENCE.md** - Commands and quick tips
- **PROJECT_SUMMARY.md** - What's included overview
- **package.json** - Root npm configuration
- **setup.bat** / **setup.sh** - Automated setup scripts
- **.gitignore** - Git ignore patterns

### Backend Files (server.js entry point)
- **models/** - Database schemas for MongoDB
- **routes/** - API endpoint definitions
- **middleware/** - Authentication logic
- **package.json** - Backend dependencies

### Frontend Files (App.js entry point)
- **components/** - Reusable React components
- **styles/** - CSS files for styling
- **api.js** - Axios API client
- **index.js** - React app entry point
- **package.json** - Frontend dependencies

### Documentation Files
- **docs/README.md** - Full documentation
- **docs/SETUP.md** - Installation guide
- **docs/API.md** - API endpoints reference
- **docs/DATABASE.md** - Database structure
- **docs/DEPLOYMENT.md** - Production deployment

---

## 🚀 Available Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev         # Start with hot reload
npm start           # Start production
npm test            # Run tests
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm start           # Start development server
npm build           # Build for production
npm test            # Run tests
```

### Root
```bash
npm run dev         # Start both simultaneously
npm run install-all # Install all dependencies
```

---

## 🔧 Configuration

### Required Files
- **backend/.env** - Backend configuration (COPY from .env.example)

### Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tournament-manager
IGDB_CLIENT_ID=your_client_id
IGDB_ACCESS_TOKEN=your_access_token
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Get IGDB Credentials
1. Visit: https://api.igdb.com/
2. Register for free account
3. Create application
4. Copy Client ID & Access Token

---

## 📱 Access Points

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| MongoDB | mongodb://localhost:27017 | 27017 |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| MongoDB error | Ensure `mongod` is running |
| IGDB API error | Verify credentials in .env |
| CORS error | Check CORS_ORIGIN in .env |
| npm install fails | Run `npm cache clean --force` |

See **docs/SETUP.md** for more troubleshooting.

---

## 📚 Learning Resources

- **MongoDB:** https://docs.mongodb.com/
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **IGDB API:** https://api-docs.igdb.com/
- **Node.js:** https://nodejs.org/docs/

---

## 🎯 Next Steps

1. ✅ Read **README.md** for overview
2. ✅ Follow **QUICK_REFERENCE.md** for setup
3. ✅ Get IGDB API credentials
4. ✅ Configure **backend/.env**
5. ✅ Run `npm run dev` to start
6. ✅ Visit http://localhost:3000
7. ✅ Create an account
8. ✅ Start organizing tournaments!

---

## 📞 Need Help?

1. **Quick questions?** → Check QUICK_REFERENCE.md
2. **Setup issues?** → See docs/SETUP.md
3. **API questions?** → Read docs/API.md
4. **Database questions?** → Review docs/DATABASE.md
5. **Deploying?** → Check docs/DEPLOYMENT.md

---

## ✨ Features Summary

### For Players
- Create account
- Join teams
- Participate in tournaments
- Track matches
- View statistics

### For Organizers
- Create tournaments
- Manage teams
- Schedule matches
- Track progress
- Manage prizes

### For Developers
- RESTful API
- Well-documented endpoints
- Easy to extend
- MongoDB integration
- JWT authentication

---

## 🏆 What's Complete

✅ Full backend API
✅ Frontend application
✅ Database models
✅ IGDB integration
✅ Authentication system
✅ API documentation
✅ Setup scripts
✅ Responsive UI
✅ Error handling
✅ Production ready

---

## 🎮 Ready to Start?

```bash
# 1. Open terminal/PowerShell
# 2. Navigate to project directory
cd c:\Users\Anacleto\Desktop\TW\tournament-manager

# 3. Run appropriate setup
setup.bat                    # Windows
# or
bash setup.sh               # Mac/Linux

# 4. Configure backend
cd backend
# Edit .env with your credentials

# 5. Start MongoDB (new terminal)
mongod

# 6. Start everything (new terminal)
npm run dev

# 7. Open browser
http://localhost:3000
```

---

**🎉 Your Game Tournament Manager is Ready!**

**Created:** January 2025  
**Status:** ✅ Complete & Ready to Use  
**Version:** 1.0.0

Enjoy organizing your esports tournaments! 🏆
