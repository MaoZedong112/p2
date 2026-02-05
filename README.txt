PROJEKT WYPOŻYCZALNIA:

------------------------------

Niech każdy założy swoj projekt na Git i doda mnie jako colaboratora (@PanInf) - jak chce to innych też.
Piszcie to tak jak UC3.


Projekt: System Zarządzania Wypożyczalnią Sprzętu

Opis ogólny
Stwórz aplikację do zarządzania wypożyczalnią sprzętu (laptopy, projektory, kamery itp.) w szkole lub firmie. System ma pozwalać na rezerwacje, śledzenie dostępności i historię wypożyczeń.

Założenia technologiczne
Backend:

Node.js + Express/Hono
SQLite jako baza danych
REST API

Frontend:

React + TypeScript
React Router do nawigacji
Axios/Fetch do komunikacji z API

Struktura bazy danych (4 tabele)
users
id, name, email, role (admin/user), created_at

equipment
id, name, category, description, status (available/rented/maintenance), image_url, created_at

rentals
id, equipment_id, user_id, rented_at, return_date, returned_at, status (active/completed/overdue)

categories
id, name, description


Endpointy API (minimum 10)
Equipment:

GET /api/equipment - lista sprzętu (z filtrowaniem po kategorii/statusie)
GET /api/equipment/:id - szczegóły sprzętu
POST /api/equipment - dodaj nowy sprzęt (admin)
PUT /api/equipment/:id - edytuj sprzęt (admin)
DELETE /api/equipment/:id - usuń sprzęt (admin)
Wymagania funkcjonalne
Widoki w React (minimum):

Dashboard - przegląd dostępnego sprzętu, statystyki
Lista sprzętu - grid/lista z filtrowaniem po kategorii
Szczegóły sprzętu - opis, status, historia wypożyczeń
Moje wypożyczenia - aktualne i historyczne
Panel admina - zarządzanie sprzętem
Formularz wypożyczenia - wybór daty zwrotu

Dodatkowe funkcjonalności:

Walidacja dat (nie można wypożyczyć na przeszłość)
Automatyczne oznaczanie zaległych wypożyczeń
Wyszukiwarka sprzętu
Sortowanie i filtrowanie list
Obsługa błędów (sprzęt już wypożyczony, itp.)


Wskazówki techniczne

Użyj better-sqlite3 dla synchronicznej obsługi SQLite
Middleware do walidacji danych wejściowych
Na froncie: custom hooki do pobierania danych (np. useEquipment)
Stan globalny - Context API lub prosta implementacja z useState
Ostylowanie - Tailwind CSS lub CSS modules

Opcjonalne rozszerzenia (dla ambitnych)

System powiadomień o zbliżającym się terminie zwrotu
Możliwość rezerwacji na przyszłość (bez natychmiastowego wypożyczenia)
Upload zdjęć sprzętu
Historia napraw i konserwacji
Eksport raportów do CSV
Kalendarz dostępności sprzętu