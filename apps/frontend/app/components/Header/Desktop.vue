<template>
  <nav class="navbar navbar-expand navbar-light bg-white ">
    <div class="container-fluid px-3 py-5">
      <!-- Navigation Links as Cards -->
      <div class="d-flex justify-content-center w-100">
        <div class="d-flex flex-wrap justify-content-center gap-2">
          <NuxtLink
            v-for="item in navigationLinks"
            :key="item.link"
            :to="item.link"
            class="text-decoration-none"
            :aria-label="`Navigate to ${item.title}`"
            @click="handleNavigation(item.link)"
          >
            <div class="card border border-1 shadow-sm nav-card">
              <div class="card-body d-flex flex-column align-items-center justify-content-center p-3">
                <i :class="item.icon" class="fs-5 mb-2 text-primary"></i>
                <span class="small fw-medium text-dark">{{ item.title }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo } from '#app'

interface NavigationLink {
  title: string
  link: string
  icon: string
}

interface Props {
  dismissOffcanvas?: boolean
}

// Define props
const props = withDefaults(defineProps<Props>(), {
  dismissOffcanvas: false
})

// Self-contained navigation links - developers should edit this directly
const navigationLinks: NavigationLink[] = [
  { title: "Home", link: "/", icon: "bi bi-house" },
  { title: "GraphQL", link: "/graph", icon: "bi bi-speedometer2" }
]

// Handle navigation with offcanvas dismissal
const handleNavigation = async (link: string) => {
  if (props.dismissOffcanvas) {
    // If we're in an offcanvas, close it first
    const offcanvasElement = document.querySelector('#navigationSidebar')
    if (offcanvasElement) {
      // Use Bootstrap's programmatic API to close the offcanvas
      const bootstrap = (window as any).bootstrap
      if (bootstrap && bootstrap.Offcanvas) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement)
        offcanvasInstance.hide()
        
        // Wait for the offcanvas to finish closing, then navigate
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          navigateTo(link)
        }, { once: true })
      } else {
        // Fallback if Bootstrap is not available
        navigateTo(link)
      }
    } else {
      // No offcanvas found, navigate normally
      navigateTo(link)
    }
  } else {
    // Not in offcanvas context, navigate normally
    navigateTo(link)
  }
}
</script>

<style scoped>
.nav-card {
  min-width: 80px;
  max-width: 120px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.nav-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.nav-card .card-body {
  min-height: 80px;
}
</style>