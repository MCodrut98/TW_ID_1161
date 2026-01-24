# Quick Reference Guide

## 🚀 Quick Start (Copy & Paste)

### Windows Users
```powershell
# Navigate to project
cd "c:\Users\Anacleto\Desktop\TW\tournament-manager"

# Run setup script
.\setup.bat

# Edit .env file
cd backend
notepad .env

# Start MongoDB (in another terminal)
mongod

# Start Backend (in one terminal)
cd backend
npm run dev

# Start Frontend (in another terminal)
cd frontend
npm start
```

### Mac/Linux Users
```bash
# Navigate to project
cd ~/Desktop/TW/tournament-manager

# Run setup script
bash setup.sh

# Edit .env file
cd backend
nano .env

# Start MongoDB (in another terminal)
mongod

# Start Backend (in one terminal)
cd backend
npm run dev

# Start Frontend (in another terminal)
cd frontend
npm start
```

## 🔑 Required Configuration

**File: `backend/.env`**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tournament-manager
IGDB_CLIENT_ID=your_client_id_here
IGDB_ACCESS_TOKEN=your_access_token_here
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## 📍 Access Points

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| API | http://localhost:5000 | 5000 |
| MongoDB | mongodb://localhost:27017 | 27017 |

## 📦 Directory Structure

```
tournament-manager/
├── backend/                    # API Server
│   ├── models/                # Database schemas
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth logic
│   ├── server.js              # Main server
│   ├── package.json           # Dependencies
│   └── .env.example           # Config template
├── frontend/                   # React App
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── styles/            # CSS files
│   │   └── api.js             # API client
│   └── package.json           # Dependencies
├── docs/                      # Documentation
│   ├── README.md
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
└── package.json              # Root config
```

## ⚙️ Environment Setup

1. **Get IGDB Credentials**
   - Visit: https://api.igdb.com/
   - Register for free account
   - Create application
   - Copy Client ID and Access Token

2. **Setup MongoDB**
   - Download: https://www.mongodb.com/try/download/community
   - Install and run `mongod`
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **Configure Backend**
   - Copy `backend/.env.example` to `backend/.env`
   - Add IGDB credentials
   - Set MONGODB_URI

## 🎮 Core Features

| Feature | Status |
|---------|--------|
| User Authentication | ✅ |
| Tournament Management | ✅ |
| Team Management | ✅ |
| Match Scheduling | ✅ |
| IGDB Integration | ✅ |
| Real-time Updates | ✅ |
| User Profiles | ✅ |
| API Documentation | ✅ |

## 📚 Key Files

**Backend:**
- `backend/server.js` - Main Express server
- `backend/models/*.js` - Database schemas
- `backend/routes/*.js` - API endpoints

**Frontend:**
- `frontend/src/App.js` - Main React component
- `frontend/src/api.js` - API client
- `frontend/src/components/*.js` - React components

**Documentation:**
- `README.md` - Project overview
- `docs/API.md` - API reference
- `docs/SETUP.md` - Setup instructions
- `docs/DATABASE.md` - Database schema

## 🔧 NPM Commands

**Backend:**
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start with hot reload
npm start            # Start production
npm test             # Run tests
```

**Frontend:**
```bash
cd frontend
npm install          # Install dependencies
npm start            # Start dev server
npm build            # Build for production
npm test             # Run tests
```

**Root:**
```bash
npm run dev          # Start both backend & frontend
npm run install-all  # Install all dependencies
```

## 🌐 API Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### Get All Tournaments
```bash
curl http://localhost:5000/api/tournaments
```

### Create Tournament (requires token)
```bash
curl -X POST http://localhost:5000/api/tournaments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Tournament","game":"123","startDate":"2025-02-01"}'
```

## 🐛 Common Issues

**Issue:** Port 5000 already in use
```bash
# Change PORT in backend/.env to another number like 5001
```

**Issue:** MongoDB connection error
```bash
# Ensure MongoDB is running:
mongod

# Or check connection string in .env
```

**Issue:** CORS error
```bash
# Check CORS_ORIGIN in backend/.env matches frontend URL
# Usually: http://localhost:3000
```

**Issue:** npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

## 📖 Documentation Files

1. **PROJECT_SUMMARY.md** - Overview of what's included
2. **README.md** - Main project documentation
3. **docs/SETUP.md** - Detailed setup guide
4. **docs/API.md** - Complete API reference
5. **docs/DATABASE.md** - Database schema documentation
6. **docs/DEPLOYMENT.md** - How to deploy to production

## 🚀 Deploy to Production

```bash
# Build frontend
cd frontend
npm run build

# Deploy backend to Heroku
heroku create your-app-name
heroku config:set NODE_ENV=production
git push heroku main
```

## 💡 Tips & Tricks

1. **Use Postman** - Test API endpoints easily
   - Download: https://www.postman.com/

2. **MongoDB Compass** - Visual MongoDB manager
   - Download: https://www.mongodb.com/products/compass

3. **VS Code Extensions**
   - MongoDB for VS Code
   - REST Client
   - Thunder Client

4. **Keep .env files secure** - Never commit to git
   - Already in .gitignore ✅

## 🆘 Help Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/
- **IGDB API:** https://api-docs.igdb.com/
- **Node.js Docs:** https://nodejs.org/docs/

## ✅ Checklist Before Starting

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or Atlas account created
- [ ] IGDB API credentials obtained
- [ ] Backend/.env configured
- [ ] Dependencies installed (npm install)
- [ ] MongoDB running
- [ ] Backend started (npm run dev)
- [ ] Frontend started (npm start)

---

**Ready to go!** Access the app at http://localhost:3000 🎮
