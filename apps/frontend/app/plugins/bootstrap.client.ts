// Bootstrap JavaScript plugin for client-side functionality
// This enables offcanvas, modals, dropdowns, and other Bootstrap components

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Import Bootstrap JavaScript only on the client side
    // This uses the local version from node_modules matching package.json (5.3.8)
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }
})