<template>
  <div>
    <!-- Set page title and meta tags using page metadata -->
    <Head>
      <Title>{{ pageTitle }}</Title>
      <Meta name="description" :content="pageDescription" />
    </Head>
    
    <HeaderNavbar />
    <HeaderSidebar />
    <NuxtPage />
    <CommonFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HeaderNavbar from '~/components/Header/Navbar.vue'
import HeaderSidebar from '~/components/Header/Sidebar.vue'

const route = useRoute()

// Default fallback metadata
const defaultPageMeta = {
  title: 'BOS2',
  description: 'BOS2 - Modern GraphQL frontend application'
}

// Get page title from route meta or use fallback
const pageTitle = computed(() => {
  return route.meta?.title as string || defaultPageMeta.title
})

// Get page description from route meta or use fallback  
const pageDescription = computed(() => {
  return route.meta?.description as string || defaultPageMeta.description
})
</script>

