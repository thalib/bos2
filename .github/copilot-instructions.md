# BOS2 Copilot Instructions

## Project Architecture
BOS2 is a full-stack application with a **monorepo structure** containing two main applications:
- **Backend**: GraphQL API server using Apollo Server (TypeScript, ES modules)
- **Frontend**: Nuxt 4 application (Vue 3, SSR/SPA)

Each app is fully independent with its own `package.json`, build pipeline, and deployment strategy.

## Key Conventions

### Module System
- **All packages use ES modules** (`"type": "module"` in package.json)
- Use `import`/`export` syntax exclusively, never `require()`
- TypeScript compiles to ES2023 modules

### Backend Patterns (`apps/backend/`)
- GraphQL-first API design with Apollo Server standalone
- TypeScript compilation to `dist/` directory
- Start workflow: `npm run compile && node ./dist/index.js`
- Server runs on port 4000 by default
- All source code in `src/` directory

### Frontend Patterns (`apps/frontend/`)
- Nuxt 4 with Vue 3 composition API
- Uses standard Nuxt directory structure (`app/app.vue` as root)
- Development server on port 3000 (default Nuxt)
- SSR-enabled by default

## Development Workflows

### Backend Development
```bash
cd apps/backend
npm start  # Compiles TypeScript and starts server
```

### Frontend Development  
```bash
cd apps/frontend
npm run dev  # Starts Nuxt dev server with hot reload
```

### Building for Production
- Backend: `npm run compile` → outputs to `dist/`
- Frontend: `npm run build` → creates `.output/` directory

## File Organization
- Root level: documentation, configuration, license
- `apps/backend/src/`: All backend TypeScript source
- `apps/frontend/app/`: Nuxt application files
- `docs/`: Setup and architectural documentation

## Dependencies
- Backend: Apollo Server v5, GraphQL v16, TypeScript
- Frontend: Nuxt v4, Vue v3
- No shared dependencies between apps (independent deployments)

## TypeScript Configuration
- Backend uses ES2023 target with Node types
- Compilation from `src/` to `dist/` with source maps
- ESModule interop enabled for compatibility

When working on this codebase:
1. **Always specify the app** when running commands (`apps/backend/` or `apps/frontend/`)
2. **Use ES module syntax** for all imports/exports
3. **Follow GraphQL-first** patterns for backend API development
4. **Use Nuxt conventions** for frontend structure and routing