// Bootstrap JavaScript plugin for client-side functionality
// This enables offcanvas, modals, dropdowns, and other Bootstrap components

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Import Bootstrap JavaScript only on the client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }
})