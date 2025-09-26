# BOS2 (Business OS)

A full-stack application with GraphQL backend and Nuxt frontend.

## Architecture

- **Backend**: TypeScript + Apollo Server + GraphQL (port 4000)
- **Frontend**: Nuxt 4 + Vue 3 (port 3000)
- **Monorepo**: Independent apps with separate build pipelines

## Getting Started

### Backend Setup

Navigate to the backend directory and start the GraphQL server:

```sh
cd apps/backend
npm install
npm start
```

The GraphQL server will be available at [http://localhost:4000](http://localhost:4000)

### Frontend Setup

Open a new terminal and navigate to the frontend directory:

```sh
cd apps/frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

## Development Commands

### Backend (`apps/backend/`)
- `npm start` - Compile TypeScript and start server
- `npm run compile` - Compile TypeScript to `dist/`

### Frontend (`apps/frontend/`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
apps/
├── backend/          # GraphQL API server
│   ├── src/         # TypeScript source code
│   └── dist/        # Compiled output
└── frontend/        # Nuxt application
    └── app/         # Application files
docs/                # Documentation
```
