---
description: 'TypeScript Apollo Server GraphQL backend coding conventions and guidelines'
applyTo: 'apps/backend/**/*.{ts,js,md,json,yml}'
---

# TypeScript Apollo Server & GraphQL Best Practices

## General Principles
- **ES Modules Only**: Use `import`/`export` syntax exclusively, never `require()`
- **TypeScript First**: All source code must be TypeScript with proper type annotations
- **GraphQL Schema First**: Design schema before implementing resolvers
- **Single Responsibility**: Keep resolvers focused and delegate business logic to services
- **Type Safety**: Use TypeScript generics and GraphQL type definitions consistently

## Project Structure
```
apps/backend/
├── src/
│   ├── index.ts          # Server entry point
│   ├── schema/           # GraphQL type definitions
│   ├── resolvers/        # GraphQL resolvers
│   ├── services/         # Business logic services
│   ├── models/           # Data models and types
│   └── utils/            # Utility functions
├── dist/                 # Compiled output
├── package.json          # ES module configuration
└── tsconfig.json         # TypeScript configuration
```

## Apollo Server Patterns

### Server Setup
- Use `startStandaloneServer` for simple setups
- Configure server on port 4000 (configurable via environment)
- Enable GraphQL Playground in development
- Use proper error handling and logging

### Schema Design
- Use SDL (Schema Definition Language) for type definitions
- Organize schema by domain/feature areas
- Use consistent naming conventions (PascalCase for types, camelCase for fields)
- Include proper field descriptions and deprecation notices
- Implement proper input validation types

### Resolver Structure
```typescript
// Group resolvers by type
const resolvers = {
  Query: {
    // Query resolvers
  },
  Mutation: {
    // Mutation resolvers
  },
  TypeName: {
    // Field resolvers for TypeName
  },
}
```

## GraphQL Schema Best Practices

### Type Definitions
```graphql
# Use proper scalar types
type User {
  id: ID!
  name: String!
  email: String!
  createdAt: String!  # Use ISO date strings
}

# Use input types for mutations
input CreateUserInput {
  name: String!
  email: String!
}

# Use unions for polymorphic responses
union SearchResult = User | Post | Comment
```

### Query Design
- Use nullable types judiciously (prefer non-null when appropriate)
- Design for client needs, not database structure
- Implement pagination for list queries
- Use connection patterns for complex pagination
- Avoid deeply nested queries that could cause performance issues

### Mutation Design
- Use descriptive mutation names (createUser, updateUser, deleteUser)
- Return meaningful response types, not just success/error
- Include the modified entity in mutation responses
- Handle partial updates properly
- Validate input data before processing

## TypeScript Configuration
- Target ES2023 for modern JavaScript features
- Enable strict mode and all strict type checking options
- Use proper module resolution (Node.js)
- Enable source maps for debugging
- Configure proper output directory (`dist/`)

### Type Safety Patterns
```typescript
// Define proper types for resolvers
interface Context {
  // Define your context type
}

interface ResolverArgs {
  input: CreateUserInput;
}

// Type resolver functions properly
const resolvers = {
  Query: {
    users: (): Promise<User[]> => {
      // Implementation
    },
  },
  Mutation: {
    createUser: (_: any, args: ResolverArgs, context: Context): Promise<User> => {
      // Implementation
    },
  },
};
```

## Development Workflow

### Commands
- `npm start` - Compile and start server
- `npm run compile` - Compile TypeScript to dist/
- `npm run dev` - Development mode with watch (if configured)

### File Organization
- Keep `index.ts` minimal - just server setup and startup
- Separate schema definitions into logical modules
- Group related resolvers together
- Extract business logic into service classes
- Use barrel exports for clean imports

### Error Handling
- Use GraphQL-specific error types
- Implement proper error logging
- Don't expose sensitive information in errors
- Use custom error classes for different error types
- Handle async errors properly in resolvers

## Security Best Practices
- Validate all input data
- Implement proper authentication/authorization
- Use query complexity analysis to prevent abuse
- Set up proper CORS configuration
- Implement rate limiting for production
- Sanitize error messages for production

## Performance Considerations
- Implement DataLoader pattern for N+1 query prevention
- Use proper database indexing
- Implement query depth limiting
- Consider caching strategies for expensive operations
- Monitor query performance and optimize slow resolvers

## Code Style
- Use consistent indentation (2 spaces)
- Add proper JSDoc comments for public APIs
- Use meaningful variable and function names
- Follow GraphQL naming conventions
- Keep functions small and focused

## Testing Patterns
- Write unit tests for business logic
- Test GraphQL operations with Apollo Server testing utilities
- Mock external dependencies properly
- Test error scenarios and edge cases
- Use type-safe testing patterns

## References
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GraphQL Schema Design](https://www.apollographql.com/blog/graphql/schema-design/)