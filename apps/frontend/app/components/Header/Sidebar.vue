<template>
  <div 
    class="offcanvas offcanvas-start" 
    tabindex="-1" 
    id="navigationSidebar" 
    aria-labelledby="navigationSidebarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="navigationSidebarLabel">Navigation</h5>
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="offcanvas" 
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body p-0">
      <HeaderDesktop :dismiss-offcanvas="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is a Bootstrap Offcanvas wrapper for the Desktop navigation
// It's triggered by the home button in the Navbar component
// No additional logic needed - Bootstrap handles the show/hide functionality
</script>