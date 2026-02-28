# QuickHire Backend

This is the backend API for the QuickHire job board application, built with Node.js, Express, and PostgreSQL.

## Features

- **Job Management**: CRUD operations for job postings.
- **Application Management**: Handle job applications and status updates.
- **Database Integration**: Robust storage with PostgreSQL.
- **RESTful API**: Clean and scalable API architecture.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM/Query Builder**: `pg` (node-postgres)
- **Validation**: [Express Validator](https://express-validator.github.io/docs/)
- **Development**: [Nodemon](https://nodemon.io/), [ts-node](https://typestrong.org/ts-node/)

## Project Structure

```text
quickhire-backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── routes/         # API route definitions
│   ├── models/         # Database models/schemas
│   ├── config/         # Configuration files (db client)
│   ├── middleware/     # Custom express middlewares
│   ├── utils/          # Helper functions
│   └── server.ts       # Entry point
├── dist/               # Compiled JavaScript files
└── tsconfig.json       # TypeScript configuration
```

## Local Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### 2. Installation

```bash
git clone https://github.com/abdulahaddf/QuickHire-backend.git
cd QuickHire-backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `QuickHire-backend` directory and add your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quickhire"
PORT=5000
```

### 4. Database Setup

Ensure your PostgreSQL server is running and the database specified in `DATABASE_URL` exists.

### 5. Running the API

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The API will be available at `http://localhost:5000/api`.

## Available Scripts

- `npm run dev`: Runs the API in development mode using `ts-node` and `nodemon`.
- `npm run build`: Compiles TypeScript to JavaScript in the `dist` folder.
- `npm start`: Runs the compiled API from the `dist` folder.
