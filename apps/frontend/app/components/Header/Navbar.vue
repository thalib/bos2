<template>
  <!-- Main Navigation Container -->
  <div class="container-fluid p-0">
    <!-- Navbar -->
    <nav class="navbar navbar-light bg-light border-bottom shadow-sm">
      <div class="container-fluid px-3">
        <!-- Left Side: Home Icon + Current Page Title -->
        <div class="d-flex align-items-center">
          <button
            class="btn btn-outline-secondary me-3 d-flex align-items-center justify-content-center rounded-2 navbar-btn navbar-square-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#navigationSidebar"
            aria-controls="navigationSidebar"
            aria-label="Open navigation menu"
          >
            <i class="bi bi-grid-3x3-gap-fill fs-5"></i>
          </button>
          <h5 class="mb-0 fw-semibold text-dark">{{ currentPageTitle }}</h5>
        </div>

        <!-- Right Side: Search Icon + User Dropdown -->
        <div class="d-flex align-items-center flex-nowrap">
          <!-- Search Icon -->
          <button
            class="btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center rounded-2 navbar-btn navbar-square-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#navigationSidebar"
            aria-controls="navigationSidebar"
            aria-label="Toggle search"
          >
            <i class="bi bi-search fs-5"></i>
          </button>

          <!-- User Dropdown -->
          <div class="dropdown position-relative">
            <button
              class="btn btn-outline-secondary d-flex align-items-center justify-content-center rounded-2 navbar-btn navbar-square-btn"
              @click="toggleUserMenu"
              aria-label="User menu"
            >
              <i class="bi bi-person fs-5"></i>
            </button>
            <ul v-show="showUserMenu" class="dropdown-menu dropdown-menu-end show position-absolute shadow-sm" style="top: calc(100% + 0.5rem); right: 0; left: auto; z-index: 1050; min-width: 150px;">
              <li>
                <button class="dropdown-item d-flex align-items-center py-0" @click="logout">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Router and route
const route = useRoute()
const router = useRouter()

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
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const logout = () => {
  alert('Logout functionality not implemented yet.')
  closeUserMenu()
}

// Handle escape key to close user menu
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
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

<style scoped>
.navbar-square-btn {
  width: 40px;
  height: 40px;
}
</style>

