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

  // HTML head configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'  // Fix: <html> element must have a lang attribute
      },
      title: 'BOS2 Application',  // Fix: Documents must have <title> element
      charset: 'utf-8',  // Fix: content-type charset should be utf-8
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'BOS2 - GraphQL Frontend Application' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    }
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

  // Nitro configuration for proper content-type headers
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      },
      '/_nuxt/**': {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8'  // Fix: media type should be application/javascript
        }
      }
    }
  },

  // Development configuration
  devServer: {
    port: 3000,
    host: 'localhost'
  },
})
