<template>
  <div>
    <!-- Set page title and meta tags -->
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

// Dynamic page title based on current route
const pageTitle = computed(() => {
  const routeName = route.name as string
  const titles: Record<string, string> = {
    'index': 'Home - BOS2 Application',
    'graph': 'GraphQL Playground - BOS2 Application', 
    'test-graphql': 'GraphQL Test - BOS2 Application'
  }
  return titles[routeName] || 'BOS2 Application'
})

// Dynamic page description based on current route
const pageDescription = computed(() => {
  const routeName = route.name as string
  const descriptions: Record<string, string> = {
    'index': 'BOS2 Application - Home page with navigation and search functionality',
    'graph': 'Interactive GraphQL playground for testing queries and mutations',
    'test-graphql': 'GraphQL testing interface with query examples and results'
  }
  return descriptions[routeName] || 'BOS2 - Modern GraphQL frontend application'
})
</script>

