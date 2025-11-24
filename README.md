# 🎮 Tournament Organizer

## 📝 Descrierea Proiectului
Tournament Organizer este o aplicație web de tip SPA (Single Page Application) destinată gestionării complete a turneelor de jocuri video. Aplicația permite utilizatorilor să creeze și să administreze turnee, integrând date reale despre jocuri (copertă, gen, platforme) prin intermediul API-ului extern **IGDB**.

Proiectul este dezvoltat individual și respectă standardele unei arhitecturi RESTful moderne.

## ✨ Funcționalități Principale

### 1. Gestionare Utilizatori și Securitate
* **Autentificare:** Sistem de înregistrare și autentificare securizată (token-based).
* **Protecția Datelor:** Accesul la date este restricționat; utilizatorii pot vizualiza, modifica sau șterge **doar** propriile turnee.
* **Sesiuni Persistente:** Starea de autentificare este păstrată chiar și după reîncărcarea paginii (refresh).

### 2. Gestionarea Turneelor (Business Logic)
* **CRUD Complet:** Utilizatorii au control total (Create, Read, Update, Delete) asupra turneelor organizate.
* **Integrare Serviciu Extern (IGDB):** La crearea unui turneu, aplicația interoghează API-ul IGDB pentru a autocompleta detaliile jocului, oferind o experiență vizuală îmbunătățită.

### 3. Gestionare Participanți (Relație Părinte-Copil)
* Aplicația implementează o relație de tip **Părinte-Copil** între entitatea **Turneu** și **Participanți**.
* Participanții sunt adăugați specific în cadrul unui turneu.
* **Cascading Delete:** Ștergerea unui turneu duce automat la ștergerea listei de participanți asociați, asigurând consistența bazei de date.

## 🛠️ Tehnologii Utilizate

* **Front-end (SPA):** React.js / Angular (Component-based architecture & Routing).
* **Back-end:** RESTful API (Node.js/Java/Python) cu răspunsuri JSON standardizate.
* **Persistență:** Bază de date relațională/nerelațională accesată prin ORM.
* **Integrări:** IGDB API (Internet Game Database).

## 🗂️ Modelul de Date

Sistemul se bazează pe minimum 3 entități interconectate:
1.  **User** - Datele de autentificare și profil.
2.  **Tournament** (Părinte) - Deținut de User, conține detalii despre eveniment și referință către jocul extern.
3.  **Participant** (Copil) - Aparține unui singur Turneu.

## 🚀 Etape de Livrare

Conform cerințelor proiectului, dezvoltarea este structurată în 3 etape:

1.  **Etapa 1: Specificații și Structură** - **Termen: 25.11.2025**
    * Definirea specificațiilor, structura repository-ului și descrierea proiectului în README.

2.  **Etapa 2: Serviciu RESTful (Back-end)** - **Termen: 20.12.2025**
    * Implementarea API-ului, rute CRUD, acces la baza de date și documentație de rulare.

3.  **Etapa 3: Aplicație Completă (Final)** - **Termen: 16.01.2026**
    * Interfața grafică (Front-end), integrarea cu Back-end-ul, autentificare funcțională și integrarea cu IGDB.

---
*Proiect realizat pentru disciplina Dezvoltare Aplicații Web.*