import { useAsyncData, useRuntimeConfig } from '#imports'

export const useGraphql = <T>(query: string, variables: Record<string, any> = {}) => {
  const { public: { graphqlEndpoint } } = useRuntimeConfig()

  return useAsyncData<T>(
    async () => {
      console.log('🚀 GraphQL Request:', { query, variables, endpoint: graphqlEndpoint })
      
      const response = await $fetch<T>(graphqlEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { query, variables },
      })
      
      console.log('📦 GraphQL Raw Response:', response)
      return response
    },
    {
      // Optional: use a key based on the query and variables to ensure correct caching
      key: JSON.stringify({ query, variables }),
      transform: (response: any) => {
        console.log('🔄 GraphQL Transform Input:', response)
        
        // Handle server-side GraphQL errors if they exist
        if (response?.errors) {
          console.error('❌ GraphQL Errors:', response.errors)
          throw new Error(`GraphQL query errors: ${JSON.stringify(response.errors)}`)
        }
        
        const transformedData = response?.data
        console.log('✅ GraphQL Transformed Data:', transformedData)
        
        return transformedData
      },
    },
  )
}
