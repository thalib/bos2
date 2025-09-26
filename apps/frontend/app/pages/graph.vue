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
const LAUNCHES_QUERY = `
  query GetBooks {
    books {
        title
        author
    }
}
`

// Use the custom composable to fetch data
const { data, pending, error } = await useGraphql(LAUNCHES_QUERY)

// Extract books from the data with reactive computed
const books = computed(() => {
  console.log('📖 Books in component:', data.value)
  return data.value?.books
})

// Debug the reactive values
watch([data, pending, error], ([newData, newPending, newError]) => {
  console.log('🔍 Component state changed:', { 
    data: newData, 
    pending: newPending, 
    error: newError 
  })
}, { immediate: true })

</script>
