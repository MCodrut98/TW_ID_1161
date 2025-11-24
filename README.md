# Game Tournament Organizer

Proiect pentru materia Dezvoltare Aplicații Web. Aplicația permite utilizatorilor să organizeze turnee de jocuri video și să gestioneze lista de participanți.

## Ce face aplicația?

1.  **Useri și Securitate:**
    * Trebuie să îți faci cont și să te loghezi ca să folosești aplicația.
    * Fiecare utilizator își vede și modifică doar propriile turnee (datele sunt protejate).

2.  **Turnee (CRUD):**
    * Pot crea, vizualiza, modifica și șterge turnee.
    * Când creez un turneu, aplicația caută jocul respectiv pe **IGDB** (API extern) și preia automat poza și numele corect.

3.  **Participanți:**
    * La un turneu pot adăuga mai mulți participanți (jucători).
    * Dacă șterg turneul, se șterg și participanții asociați.

## Tehnologii folosite

* **Frontend:** SPA (Single Page Application) cu componente și routing.
* **Backend:** REST API care trimite date JSON.
* **Bază de date:** Stochează userii, turneele și participanții.

## Etape proiect

1.  **Etapa 1:** Descrierea proiectului.s
2.  **Etapa 2:** Backend funcțional (REST API).
3.  **Etapa 3:** Aplicația completă (Frontend + Backend).