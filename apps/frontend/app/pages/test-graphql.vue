<template>
  <div class="graphql-test">
    <h1>Unified GraphQL Composable Test</h1>
    
    <div class="section">
      <h2>1. Basic Query Test</h2>
      <button @click="testBasicQuery" :disabled="loading">
        Test Basic Query
      </button>
      <div v-if="basicResult" class="result">
        <pre>{{ JSON.stringify(basicResult, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="section">
      <h2>2. Query with Variables</h2>
      <button @click="testQueryWithVariables" :disabled="loading">
        Test Query with Variables
      </button>
      <div v-if="variablesResult" class="result">
        <pre>{{ JSON.stringify(variablesResult, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="section">
      <h2>3. Mutation Test</h2>
      <button @click="testMutation" :disabled="mutationLoading">
        {{ mutationLoading ? 'Creating...' : 'Test Mutation' }}
      </button>
      <div v-if="mutationResult" class="result">
        <pre>{{ JSON.stringify(mutationResult, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="section">
      <h2>4. Authentication Test</h2>
      <div v-if="!graphql.isLoggedIn.value">
        <input v-model="loginForm.email" placeholder="Email" />
        <input v-model="loginForm.password" type="password" placeholder="Password" />
        <button @click="testLogin" :disabled="graphql.authLoading.value">
          {{ graphql.authLoading.value ? 'Logging in...' : 'Test Login' }}
        </button>
      </div>
      <div v-else>
        <p>Logged in as: {{ graphql.user.value?.email }}</p>
        <button @click="testLogout">Logout</button>
      </div>
    </div>

    <div class="section">
      <h2>5. Pagination Test</h2>
      <button @click="testPagination" :disabled="paginationLoading">
        Test Pagination
      </button>
      <div v-if="paginationResult" class="result">
        <pre>{{ JSON.stringify(paginationResult, null, 2) }}</pre>
      </div>
    </div>

    <div class="section">
      <h2>6. File Upload Test</h2>
      <input type="file" @change="handleFileSelect" />
      <button @click="testFileUpload" :disabled="!selectedFile || uploadLoading">
        {{ uploadLoading ? 'Uploading...' : 'Test File Upload' }}
      </button>
      <div v-if="fileUploadResult" class="result">
        <pre>{{ JSON.stringify(fileUploadResult, null, 2) }}</pre>
      </div>
    </div>
    
    <div v-if="error" class="error">
      <h3>Error:</h3>
      <p>{{ error }}</p>
    </div>

    <div class="info">
      <h3>GraphQL Client Status:</h3>
      <ul>
        <li>Authenticated: {{ graphql.isAuthenticated.value ? 'Yes' : 'No' }}</li>
        <li>User: {{ graphql.user.value?.name || 'None' }}</li>
        <li>Endpoint: {{ graphqlEndpoint }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Initialize the unified GraphQL composable
const graphql = useGraphql({ debug: true })
const { public: { graphqlEndpoint } } = useRuntimeConfig()

// Reactive state
const loading = ref(false)
const mutationLoading = ref(false)
const paginationLoading = ref(false)
const uploadLoading = ref(false)
const error = ref<string | null>(null)

// Results
const basicResult = ref(null)
const variablesResult = ref(null)
const mutationResult = ref(null)
const paginationResult = ref(null)
const fileUploadResult = ref(null)

// Forms
const loginForm = ref({
  email: 'demo@example.com',
  password: 'demo123'
})

const selectedFile = ref<File | null>(null)

// Test functions
const testBasicQuery = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Demo query - will fail against real server but shows structure
    const demoQuery = `
      query GetDemo {
        demo {
          id
          message
          timestamp
        }
      }
    `
    
    // For demonstration purposes, simulate a successful response
    basicResult.value = {
      status: 'success',
      message: 'Basic query executed successfully',
      query: demoQuery,
      note: 'This is a demo - no real GraphQL server connected'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

const testQueryWithVariables = async () => {
  try {
    loading.value = true
    error.value = null
    
    const demoQuery = `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
        }
      }
    `
    
    const variables = { id: '123' }
    
    // Demo response
    variablesResult.value = {
      status: 'success', 
      message: 'Query with variables executed successfully',
      query: demoQuery,
      variables,
      note: 'This is a demo - no real GraphQL server connected'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

const testMutation = async () => {
  try {
    mutationLoading.value = true
    error.value = null
    
    const demoMutation = `
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
        }
      }
    `
    
    const variables = {
      input: {
        name: 'Test User',
        email: 'test@example.com'
      }
    }
    
    // Demo response
    mutationResult.value = {
      status: 'success',
      message: 'Mutation executed successfully',
      mutation: demoMutation,
      variables,
      result: {
        id: 'demo-123',
        name: 'Test User', 
        email: 'test@example.com'
      },
      note: 'This is a demo - no real GraphQL server connected'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    mutationLoading.value = false
  }
}

const testLogin = async () => {
  try {
    error.value = null
    
    // Demo login - would normally call: 
    // await graphql.login(loginForm.value.email, loginForm.value.password)
    
    // For demo, just show the capability
    console.log('Would attempt login with:', loginForm.value)
    error.value = 'Demo: Login functionality available (no real auth server connected)'
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

const testLogout = async () => {
  try {
    await graphql.logout()
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

const testPagination = async () => {
  try {
    paginationLoading.value = true
    error.value = null
    
    const demoQuery = `
      query GetPosts($first: Int, $after: String) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              author
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    `
    
    // Demo response
    paginationResult.value = {
      status: 'success',
      message: 'Pagination executed successfully',
      query: demoQuery,
      result: {
        posts: {
          edges: [
            { node: { id: '1', title: 'Post 1', author: 'Author 1' }, cursor: 'cursor1' },
            { node: { id: '2', title: 'Post 2', author: 'Author 2' }, cursor: 'cursor2' }
          ],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: 'cursor1',
            endCursor: 'cursor2'
          },
          totalCount: 10
        }
      },
      note: 'This is a demo - no real GraphQL server connected'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    paginationLoading.value = false
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] || null
}

const testFileUpload = async () => {
  if (!selectedFile.value) return
  
  try {
    uploadLoading.value = true
    error.value = null
    
    // Demo file upload
    fileUploadResult.value = {
      status: 'success',
      message: 'File upload executed successfully',
      file: {
        name: selectedFile.value.name,
        size: selectedFile.value.size,
        type: selectedFile.value.type
      },
      result: {
        id: 'demo-file-123',
        filename: selectedFile.value.name,
        mimetype: selectedFile.value.type,
        size: selectedFile.value.size,
        url: 'https://example.com/files/demo-file-123'
      },
      note: 'This is a demo - no real file upload server connected'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    uploadLoading.value = false
  }
}

// Page metadata
definePageMeta({
  title: 'Unified GraphQL Test'
})
</script>

<style scoped>
.graphql-test {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.section h2 {
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  line-height: 1.4;
}

.error {
  margin-top: 1rem;
  padding: 1rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
  border: 1px solid #e57373;
}

.error h3 {
  margin-top: 0;
}

.info {
  margin-top: 2rem;
  padding: 1rem;
  background: #e3f2fd;
  border-radius: 4px;
  border: 1px solid #bbdefb;
}

.info h3 {
  margin-top: 0;
  color: #1565c0;
}

.info ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info li {
  margin: 0.25rem 0;
}
</style>