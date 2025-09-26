<template>
  <!-- Main Navigation Container -->
  <div class="container-fluid p-0">
    <!-- Navbar -->
    <nav class="navbar navbar-light bg-light border-bottom shadow-sm">
      <div class="container-fluid px-3">
        <!-- Left Side: Home Icon + Current Page Title -->
        <div class="d-flex align-items-center">
          <button
            class="btn btn-outline-secondary me-3 d-flex align-items-center justify-content-center rounded-2 navbar-btn"
            style="width: 40px; height: 40px;"
            @click="goHome"
            aria-label="Go to home"
          >
            <i class="bi bi-house fs-5"></i>
          </button>
          <h5 class="mb-0 fw-semibold text-dark">{{ currentPageTitle }}</h5>
        </div>

        <!-- Right Side: Search Icon + User Dropdown -->
        <div class="d-flex align-items-center flex-nowrap">
          <!-- Search Icon -->
          <button
            class="btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center rounded-2 navbar-btn"
            style="width: 40px; height: 40px;"
            @click="toggleSearch"
            aria-label="Toggle search"
          >
            <i class="bi bi-search fs-5"></i>
          </button>

          <!-- User Dropdown -->
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary d-flex align-items-center justify-content-center rounded-2 navbar-btn"
              style="width: 40px; height: 40px;"
              @click="toggleUserMenu"
              aria-label="User menu"
            >
              <i class="bi bi-person fs-5"></i>
            </button>
            <ul v-show="showUserMenu" class="dropdown-menu dropdown-menu-end show position-absolute shadow-lg border-0" style="top: calc(100% + 0.5rem); z-index: 1050; min-width: 150px;">
              <li>
                <button class="dropdown-item d-flex align-items-center py-2" @click="logout">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Search Box - Positioned Below Navbar -->
    <div v-show="showSearch" class="bg-light border-bottom border-top py-3">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="input-group shadow-sm">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-search text-muted"></i>
              </span>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                class="form-control border-start-0 ps-1"
                placeholder="Search..."
                @keyup.enter="performSearch"
                @keyup.escape="closeSearch"
              >
              <button
                class="btn btn-outline-secondary"
                @click="performSearch"
                :disabled="!searchQuery.trim()"
                :class="{ 'disabled': !searchQuery.trim() }"
              >
                Search
              </button>
              <button
                class="btn btn-outline-danger"
                @click="closeSearch"
              >
                <i class="bi bi-x fs-6"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router and route
const route = useRoute()
const router = useRouter()

// Search functionality
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

// User menu functionality
const showUserMenu = ref(false)

// Computed properties
const currentPageTitle = computed(() => {
  // Get page title from route meta or generate from path
  if (route.meta?.title) {
    return route.meta.title as string
  }
  
  // Generate title from route path
  const pathSegments = route.path.split('/').filter(segment => segment)
  
  if (pathSegments.length === 0) {
    return 'Home'
  }
  
  // Capitalize and format the last segment
  const lastSegment = pathSegments[pathSegments.length - 1]
  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Methods
const goHome = () => {
  router.push('/')
}

const toggleSearch = async () => {
  showSearch.value = !showSearch.value
  showUserMenu.value = false // Close user menu when opening search
  
  if (showSearch.value) {
    await nextTick()
    searchInput.value?.focus()
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showSearch.value = false // Close search when opening user menu
}

const closeSearch = () => {
  showSearch.value = false
  searchQuery.value = ''
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const performSearch = () => {
  const query = searchQuery.value.trim()
  
  if (!query) {
    return
  }
  
  // Show alert with searched text
  alert(`Search feature not implemented yet.\nYou searched for: "${query}"`)
  
  // Clear search and close
  searchQuery.value = ''
  closeSearch()
}

const logout = () => {
  alert('Logout functionality not implemented yet.')
  closeUserMenu()
}

// Handle escape key to close search and user menu
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (showSearch.value) {
      closeSearch()
    }
    if (showUserMenu.value) {
      closeUserMenu()
    }
  }
}

// Handle click outside to close menus
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (showUserMenu.value && !target.closest('.dropdown')) {
    closeUserMenu()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})
</script>

