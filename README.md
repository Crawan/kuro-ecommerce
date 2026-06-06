# Kuro E-Commerce

A full-stack e-commerce application built with a vanilla frontend and an Express backend.

## Tech Stack
### Backend
- **Express 5** REST API
- **PostgreSQL** with `pg` driver
- **JWT** authentication (`jsonwebtoken`)
- **bcrypt** for password hashing
- **UUID v7** for user IDs
- **email-validator** for input validation

## Project Structure

```
Kuro/
├── backend/           # Express REST API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── database/      # DB connection & repositories
│   │   ├── middlewares/    # JWT auth middleware
│   │   ├── utils/         # Helpers (JWT, hashing, responses)
│   │   └── index.js       # App entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js ≥ 18
- PostgreSQL

### Backend

```bash
cd backend
npm install
# Create a .env file (see .env.example)
npm run dev
```

The API server starts on the port defined in your `.env` file (default `8080`).

The dev server starts on `http://localhost:5173` by default.

## API Routes

| Method | Route       | Auth Required | Description              |
|--------|-------------|:-------------:|--------------------------|
| GET    | `/`         | No            | Health check             |
| POST   | `/register` | No            | Register a new user      |
| POST   | `/login`    | No            | Login and receive a JWT  |
| GET    | `/profile`  | Yes (Bearer)  | Get authenticated user's profile |
