<template>
  <div>
    <h1>Books</h1>
    <div v-if="pending">Loading...</div>
    <div v-if="error">
      An error occurred: {{ error.message }}
    </div>
    <div v-else-if="data && books">
      <ul>
        <li v-for="book in books" :key="book.title">
          {{ book.title }} by {{ book.author }}
        </li>
      </ul>
    </div>
    <div v-else-if="!pending && !error">
      No books found
    </div>
    
    <!-- Debug info -->
    <details style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
      <summary>Debug Info</summary>
      <pre>{{ { data, pending, error: error?.message, books } }}</pre>
    </details>
  </div>
</template>

<script setup lang="ts">
// GraphQL query string
const BOOKS_QUERY = `
  query GetBooks {
    books {
      title
      author
    }
  }
`

// Initialize GraphQL client with debug mode
const graphql = useGraphql({ debug: true })

// Use the query method to fetch books data
const { data, pending, error } = await graphql.query(BOOKS_QUERY)

// Extract books from the data with reactive computed
const books = computed(() => {
  return data.value?.books
})
</script>
