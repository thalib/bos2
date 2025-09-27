<template>
  <div class="d-flex justify-content-center w-100 px-3">
    <div class="input-group" style="max-width: 400px;">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search..."
        aria-label="Search"
        @keyup.enter="handleSearch"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="handleSearch"
        :disabled="isSearchDisabled"
      >
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>

  <!-- Alert for showing search results -->
  <div
    v-if="showAlert"
    class="alert alert-info alert-dismissible fade show mt-3"
    role="alert"
  >
    <strong>Search performed:</strong> "{{ lastSearchQuery }}" - Feature not yet implemented.
    <button
      type="button"
      class="btn-close"
      @click="closeAlert"
      aria-label="Close"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive data
const searchQuery = ref('')
const showAlert = ref(false)
const lastSearchQuery = ref('')

// Computed properties
const isSearchDisabled = computed(() => {
  return !searchQuery.value || searchQuery.value.trim().length === 0
})

// Methods
const handleSearch = () => {
  const trimmedQuery = searchQuery.value.trim()
  
  // Validate input - ignore empty or whitespace-only searches
  if (!trimmedQuery) {
    return
  }
  
  // Store the search query and show alert
  lastSearchQuery.value = trimmedQuery
  showAlert.value = true
  
  // Optional: Clear the search input after search
  // searchQuery.value = ''
}

const closeAlert = () => {
  showAlert.value = false
}
</script>

<style scoped>
/* Component uses only Bootstrap utility classes for styling */
</style>
