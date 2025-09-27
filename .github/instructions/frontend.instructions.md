---
description: 'Nuxt4 & Vue 3 frontend coding conventions and guidelines'
applyTo: 'apps/frontend/**/*.{vue,ts,js,md,json,scss,css,yml}'
---

# Nuxt4 & Vue 3 Best Practices

## General Principles
- Follow [Vue.js Style Guide](https://vuejs.org/style-guide/) (Priority A & B rules are mandatory, C recommended)
- Follow [Nuxt Directory Structure](https://nuxt.com/docs/guide/directory-structure) and [Nuxt Best Practices](https://nuxt.com/docs/guide/concepts/best-practices)
- Use Composition API (`<script setup lang="ts">`) for all new components
- Prefer TypeScript for all logic and components
- Use PascalCase for component filenames (e.g., `MyComponent.vue`)
- Use kebab-case for composables and utility files (e.g., `use-foo.ts`)
- Use `.vue` for components/pages/layouts, `.ts` for composables, stores, utils, and config
- Use `.md` for documentation, `.json` for config, `.scss`/`.css` for styles, `.yml` for workflows
- Only support modern browsers (ES2020+)
- This is a private app, no need of SEO and accessibility (a11y) compliance

## Component Guidelines
- One component per file
- Use `<template>`, `<script setup lang="ts">`, and `<style scoped>` blocks
- Keep components small and focused (SRP)
- Use props with explicit types and default values
- Use emits for events, define with `defineEmits`
- Use `defineProps` and `defineEmits` for type safety
- Prefer composables for logic reuse

## Directory Structure
- Place components in `apps/frontend/app/components/`
- Place pages in `apps/frontend/app/pages/`
- Place composables in `apps/frontend/app/composables/`
- Place stores in `apps/frontend/app/stores/`
- Place utils in `apps/frontend/app/utils/`
- Place layouts in `apps/frontend/app/layouts/`
- Place static assets in `apps/frontend/public/`

## Documentation
- Place documentation in `docs/` mirroring the source structure
- Use markdown files for component and feature documentation
- Document complex composables and utilities
- **NEVER** create README.md or documentation files inside the source code directories
- Example: `apps/frontend/app/components/Header/Navbar.vue` → `docs/frontend/app/components/Header/Navbar.md`

## Testing
- Place tests in `apps/frontend/tests/` mirroring the source structure
- Use Vitest for unit/integration tests
- Use Playwright for E2E tests

## Linting & Formatting
- Use ESLint with Vue/TypeScript plugins
- Use Prettier for code formatting

## GraphQL Integration
- Use `useGraphql` composable for all GraphQL operations
- Configure GraphQL endpoint in `nuxt.config.ts` runtimeConfig and `.env` file
- Handle GraphQL errors with proper error boundaries
- Use TypeScript generics for type-safe GraphQL responses
- Debug GraphQL requests/responses using console logs during development
- Use `computed()` for reactive data transformations from GraphQL responses
- Optimize for SPA deployment (client-side rendering)

### GraphQL Query Pattern
```typescript
// Define query string
const QUERY = `
  query GetData {
    field {
      subField
    }
  }
`

// Use composable with type safety
const { data, pending, error } = await useGraphql<QueryResponse>(QUERY)

// Transform data reactively
const transformedData = computed(() => data.value?.field)
```

## Styling Guidelines
- Use **Bootstrap 5.3** CSS classes for all UI styling
- **NEVER** use custom CSS unless absolutely necessary - prefer Bootstrap utilities
- Never modify or override any Bootstrap CSS classes, create custom classes instead
- Avoid inline CSS styling; always use classes for styling
- Use **Bootstrap Icons** for icons (https://icons.getbootstrap.com/)
- Remove `<style scoped>` blocks that contain custom CSS that can be achieved with Bootstrap
- If custom CSS is truly necessary, document why Bootstrap classes cannot achieve the same result

## References
- [Vue Style Guide](https://vuejs.org/style-guide/)
- [Nuxt Best Practices](https://nuxt.com/docs/guide/concepts/best-practices)
- [Nuxt Directory Structure](https://nuxt.com/docs/guide/directory-structure)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)