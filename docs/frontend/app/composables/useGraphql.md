# useGraphql Composable

Unified GraphQL client for BOS2 frontend providing all GraphQL functionality
in a single, lightweight composable.

## Features

- **Query Execution** - Cached queries with server-side rendering support
- **Mutations** - Direct mutation execution with error handling
- **Authentication** - Complete auth flow with token management
- **Pagination** - Cursor-based pagination with load more functionality
- **File Uploads** - Multipart file uploads with progress tracking
- **Error Handling** - Comprehensive error handling with retry logic
- **Debug Mode** - Console logging for development
- **TypeScript** - Full type safety with generic support

## Basic Usage

### Initialize Client

```typescript
// Initialize with global options (optional)
const graphql = useGraphql({ 
  auth: true,    // Automatically add auth headers
  debug: true    // Enable console logging
})
```

### Queries

#### Simple Query
```typescript
const { data, pending, error } = await graphql.query(`
  query GetUsers {
    users { id name email }
  }
`)
```

#### Query with Variables
```typescript
const { data, pending, error } = await graphql.query(`
  query GetUser($id: ID!) {
    user(id: $id) { id name email }
  }
`, { id: '123' })
```

#### Query with Options
```typescript
const { data, pending, error } = await graphql.query(
  operation,
  variables,
  { 
    auth: true,      // Require authentication
    cache: false,    // Disable caching
    retry: 2,        // Retry failed requests
    server: false    // Client-side only
  }
)
```

### Mutations

#### Simple Mutation
```typescript
const result = await graphql.mutate(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) { id name email }
  }
`, { input: { name: 'John', email: 'john@example.com' } })
```

#### Authenticated Mutation
```typescript
const result = await graphql.mutate(operation, variables, { auth: true })
```

## Authentication

### Login
```typescript
const user = await graphql.login('user@example.com', 'password')
// Token automatically stored and applied to future requests
```

### Logout
```typescript
await graphql.logout()
// Token automatically cleared
```

### Check Authentication Status
```typescript
const { isAuthenticated, isLoggedIn, user } = graphql

// Reactive states
console.log(isAuthenticated.value) // boolean
console.log(user.value) // AuthUser | null
```

### Manual Token Management
```typescript
graphql.setToken('your-jwt-token', true) // persistent = true
graphql.clearToken()

const currentUser = await graphql.getCurrentUser()
```

## Pagination

### Cursor-based Pagination
```typescript
const pagination = graphql.paginate(`
  query GetPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      edges { node { id title } cursor }
      pageInfo { hasNextPage endCursor }
      totalCount
    }
  }
`)

// Access paginated data
console.log(pagination.data.value) // Post[]
console.log(pagination.hasNextPage.value) // boolean

// Load next page
await pagination.fetchPage() // Replace current data
await pagination.loadMore()  // Append to current data
```

## File Operations

### File Upload
```typescript
const fileInput = document.querySelector('input[type="file"]')
const file = fileInput.files[0]

const uploadedFile = await graphql.uploadFile(file, {
  category: 'documents',
  public: true
})

console.log(uploadedFile) // { id, filename, url, size, mimetype }
```

## Advanced Usage

### Direct Execution
```typescript
// Direct execution without caching
const result = await graphql.execute(operation, variables, options)
```

### Custom Transform
```typescript
const { data } = await graphql.query(operation, variables, {
  transform: (data) => data.users.map(u => ({ ...u, fullName: `${u.name}` }))
})
```

### Error Handling
```typescript
try {
  const result = await graphql.mutate(operation, variables)
} catch (error) {
  console.error('GraphQL Error:', error.message)
}
```

## Configuration

### Nuxt Configuration
In `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      graphqlEndpoint: 'http://localhost:4000/graphql'
    }
  }
})
```

### Environment Variables
- `NUXT_PUBLIC_GRAPHQL_ENDPOINT` - GraphQL server endpoint

## Types

### Core Types
- `GraphqlOptions<T>` - Request configuration options
- `AuthUser` - User object structure
- `AuthTokens` - Authentication token structure
- `PageInfo` - Pagination information
- `FileUpload` - File upload response structure

### Option Properties
- `auth: boolean` - Require authentication
- `debug: boolean` - Enable console logging
- `cache: boolean` - Enable query caching (default: true)
- `retry: number` - Number of retry attempts (default: 0)
- `server: boolean` - Run on server-side (default: true for queries)
- `transform: (data) => T` - Data transformation function

## Best Practices

### Query Organization
Group related queries by feature:
```typescript
// users.queries.ts
export const GET_USERS = `query GetUsers { users { id name } }`
export const GET_USER = `query GetUser($id: ID!) { user(id: $id) { id name } }`

// In component
import { GET_USERS } from '~/queries/users.queries'
const { data } = await graphql.query(GET_USERS)
```

### Error Boundaries
Implement proper error handling:
```typescript
const { data, error } = await graphql.query(operation)
if (error.value) {
  // Handle error in UI
  console.error(error.value)
}
```

### Performance
- Use `cache: true` for read-heavy operations
- Use `server: false` for client-only operations
- Implement pagination for large datasets
- Use `transform` for expensive data processing

### Security
- Always use `auth: true` for protected operations
- Never expose sensitive tokens in client code
- Validate all user inputs before mutations
- Handle authentication errors gracefully
