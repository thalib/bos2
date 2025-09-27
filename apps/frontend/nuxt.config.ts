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

  // Disable SSR for SPA deployment - private app, no SEO needed
  ssr: false,

  // TypeScript configuration - simplified for development
  typescript: {
    strict: false,
    typeCheck: false
  },

  // CSS configuration
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  // Plugins configuration
  plugins: [
    '~/plugins/bootstrap.client.ts'
  ],

  // Development configuration
  devServer: {
    port: 3000,
    host: 'localhost'
  },
})
