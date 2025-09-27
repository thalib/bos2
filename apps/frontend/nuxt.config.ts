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

  // Scripts configuration
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
          integrity: 'sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  // Development configuration
  devServer: {
    port: 3000,
    host: 'localhost'
  },
})
