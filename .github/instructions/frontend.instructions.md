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

## Testing
- Place tests in `apps/frontend/tests/` mirroring the source structure
- Use Vitest for unit/integration tests
- Use Playwright or Cypress for E2E tests

## Linting & Formatting
- Use ESLint with Vue/TypeScript plugins
- Use Prettier for code formatting

## GraphQL Integration
- Use `useGraphql` composable for all GraphQL operations
- Configure GraphQL endpoint in `nuxt.config.ts` runtimeConfig
- Handle GraphQL errors with proper error boundaries
- Use TypeScript generics for type-safe GraphQL responses
- Debug GraphQL requests/responses using console logs during development
- Use `computed()` for reactive data transformations from GraphQL responses

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

## References
- [Vue Style Guide](https://vuejs.org/style-guide/)
- [Nuxt Best Practices](https://nuxt.com/docs/guide/concepts/best-practices)
- [Nuxt Directory Structure](https://nuxt.com/docs/guide/directory-structure)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)