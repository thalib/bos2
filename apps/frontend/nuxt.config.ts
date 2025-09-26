// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      // GraphQL endpoint configuration
      graphqlEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
      // Optional: GraphQL WebSocket endpoint for subscriptions (future use)
      graphqlWsEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_WS_ENDPOINT || 'ws://localhost:4000/graphql',
    },
  },

  // Enable SSR for better performance and SEO
  ssr: true,

  // TypeScript configuration - simplified for development
  typescript: {
    strict: false,
    typeCheck: false
  },

  // CSS configuration
  css: [
    // Global CSS files can be added here
  ],

  // Development configuration
  devServer: {
    port: 3000,
    host: 'localhost'
  },

  // Experimental features
  experimental: {
    // Enable Nuxt 4 directory structure
    scanPageMeta: true,
  },

  // Nitro configuration for better GraphQL integration
  nitro: {
    // Enable CORS for development
    devProxy: {
      '/api/graphql': {
        target: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})
