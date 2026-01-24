# Game Tournament Manager

Aplicație web full‑stack pentru organizarea și gestionarea turneelor de esports, cu integrare IGDB pentru date despre jocuri.

## 🎮 Funcționalități

- **Management utilizatori**: înregistrare, autentificare și profil
- **Sistem turnee**: creare și administrare turnee cu formate multiple
- **Management echipe**: creare echipe și administrare roster
- **Programare meciuri**: generare automată și urmărire rezultate
- **Integrare IGDB**: acces la mii de jocuri din Internet Game Database
- **Actualizări în timp real**: progresul turneelor actualizat live
- **Statistici jucători**: victorii, înfrângeri și performanțe

## 🚀 Pornire rapidă

### Cerințe
- Node.js (v14 sau mai nou)
- MongoDB
- Creditențiale IGDB API (https://api.igdb.com/)

### Instalare

1. **Intră în proiect**
```bash
cd tournament-manager
```

2. **Rulează scriptul de setup**

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

3. **Configurează variabilele de mediu**
```bash
cd backend
# Editează fișierul .env cu credențialele IGDB și URL-ul bazei de date
```

4. **Pornește MongoDB**
```bash
mongod
```

5. **Pornește aplicația**

**Opțiunea 1: ambele simultan**
```bash
npm run dev
```

**Opțiunea 2: separat**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

## 📱 Acces

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000

## 📂 Structură proiect

```
tournament-manager/
├── backend/              # API Node.js/Express
│   ├── models/          # Modele DB
│   ├── routes/          # Endpoints API
│   ├── middleware/      # Autentificare & validare
│   └── server.js        # Server Express
├── frontend/            # Aplicație React
│   ├── src/
│   │   ├── components/  # Componente React
│   │   ├── styles/      # Fișiere CSS
│   │   └── api.js       # Client API
└── docs/               # Documentație
```

## 🔑 Configurare mediu

Creează `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tournament-manager
IGDB_CLIENT_ID=your_client_id
IGDB_ACCESS_TOKEN=your_access_token
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

## 📚 Funcționalități principale

### 1. Autentificare utilizatori
- Înregistrare cont
- Login securizat cu JWT
- Profil și statistici utilizator

### 2. Management turnee
- Creare turnee cu setări personalizate
- Formate multiple (Single/Double Elimination, Round Robin, Swiss)
- Programare și status turnee
- Administrare premii

### 3. Sistem de echipe
- Creare și administrare echipe
- Invitare membri
- Statistici echipă
- Istoric echipă

### 4. Meciuri & programare
- Generare automată meciuri
- Creare manuală meciuri
- Urmărire rezultate
- Vizualizare bracket

### 5. Baza de date jocuri
- Căutare jocuri prin IGDB
- Titluri populare esports
- Detalii joc (gen, platforme etc.)

## 🛠️ Tehnologii

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Autentificare JWT
- Integrare IGDB API

**Frontend:**
- React 18
- React Router
- Axios
- CSS3

## 📖 Documentație API

### Autentificare
- `POST /api/auth/register` - Creare cont
- `POST /api/auth/login` - Autentificare

### Turnee
- `GET /api/tournaments` - Listare turnee
- `POST /api/tournaments` - Creare turneu
- `GET /api/tournaments/:id` - Detalii turneu
- `PUT /api/tournaments/:id` - Actualizare turneu
- `DELETE /api/tournaments/:id` - Ștergere turneu

### Echipe
- `GET /api/teams` - Listare echipe
- `POST /api/teams` - Creare echipă
- `GET /api/teams/:id` - Detalii echipă
- `POST /api/teams/:id/members` - Adăugare membru

### Meciuri
- `GET /api/matches` - Listare meciuri
- `POST /api/matches` - Creare meci
- `PUT /api/matches/:id` - Actualizare rezultat

### Jocuri
- `GET /api/games` - Listare jocuri
- `GET /api/games/search/:query` - Căutare IGDB
- `POST /api/games` - Adăugare joc în DB

## 🐛 Depanare

**Eroare conexiune MongoDB**
- Verifică dacă MongoDB rulează
- Verifică `MONGODB_URI` în `.env`

**Eroare IGDB API**
- Verifică Client ID și Access Token
- Verifică limitele de rată ale API-ului
- Asigură header-ul de autorizare corect

**Port deja folosit**
- Schimbă `PORT` în `backend/.env`
- Oprește procesul care folosește portul

**Probleme CORS**
- Verifică `CORS_ORIGIN`
- Implicit: `http://localhost:3000`

## 📝 Licență

Licență MIT - vezi fișierul LICENSE pentru detalii

## 🤝 Contribuții

1. Creează un branch de feature
2. Fă modificările necesare
3. Testează complet
4. Trimite un pull request

## 📞 Suport

Pentru întrebări sau probleme:
- Verifică folderul docs
- Consultă ghidul SETUP.md
- Creează un issue în repository

---

**Succes la organizarea turneelor! 🏆**
