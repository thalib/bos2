import { ref, computed, readonly, useAsyncData, useRuntimeConfig } from '#imports'
import type { Ref, ComputedRef } from 'vue'

// Core Types
export interface GraphqlOptions<T = any> {
  auth?: boolean
  debug?: boolean
  cache?: boolean
  retry?: number
  transform?: (data: any) => T
  server?: boolean
}

export interface GraphqlError {
  message: string
  locations?: Array<{ line: number; column: number }>
  path?: string[]
  extensions?: Record<string, any>
}

// Auth Types
export interface AuthUser {
  id: string
  email: string
  name?: string
  roles?: string[]
  [key: string]: any
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

// Pagination Types
export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}

export interface Connection<T> {
  edges: Array<{ node: T; cursor: string }>
  pageInfo: PageInfo
  totalCount: number
}

export interface PaginatedResult<T> {
  nodes: T[]
  totalCount: number
  pageInfo?: PageInfo
  hasMore?: boolean
}

// File Types
export interface FileUpload {
  id: string
  filename: string
  mimetype: string
  size: number
  url: string
}

// Global GraphQL State
const authState = {
  isAuthenticated: ref(false),
  user: ref<AuthUser | null>(null),
  loading: ref(false),
  error: ref<Error | null>(null)
}

// Token Management
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('graphql-token') || sessionStorage.getItem('graphql-token')
}

const setToken = (token: string, persistent = true): void => {
  if (typeof window === 'undefined') return
  const storage = persistent ? localStorage : sessionStorage
  storage.setItem('graphql-token', token)
  authState.isAuthenticated.value = true
}

const clearToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('graphql-token')
  sessionStorage.removeItem('graphql-token')
  authState.isAuthenticated.value = false
  authState.user.value = null
}

// Core GraphQL Client
export const useGraphql = <T = any>(
  operationOrOptions?: string | GraphqlOptions<T>
) => {
  const { public: { graphqlEndpoint } } = useRuntimeConfig()
  
  // Handle overloaded parameters
  const isOptionsOnly = typeof operationOrOptions === 'object' && operationOrOptions !== null
  const globalOptions = isOptionsOnly ? operationOrOptions : {}

  const execute = async <TResult = T, TVariables = Record<string, any>>(
    operation: string,
    variables: TVariables = {} as TVariables,
    options: GraphqlOptions<TResult> = {}
  ): Promise<TResult> => {
    const {
      auth = false,
      debug = false,
      retry = 0,
      transform,
      ...mergedOptions
    } = { ...globalOptions, ...options }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (auth) {
      const token = getToken()
      if (token) {
        headers.Authorization = `Bearer ${token}`
      } else {
        throw new Error('Authentication required but no token found')
      }
    }

    let attempt = 0
    let lastError: Error | null = null

    while (attempt <= retry) {
      try {
        if (debug) {
          console.log('🚀 GraphQL:', { operation: operation.slice(0, 100), variables, auth })
        }

        const response = await $fetch<{ data?: TResult; errors?: GraphqlError[] }>(
          graphqlEndpoint,
          {
            method: 'POST',
            headers,
            body: { query: operation, variables }
          }
        )

        if (response.errors?.length) {
          throw new Error(`GraphQL errors: ${JSON.stringify(response.errors)}`)
        }

        let result = response.data as TResult
        if (transform && result) {
          result = transform(result)
        }

        if (debug) {
          console.log('✅ GraphQL Result:', result)
        }

        return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        attempt++

        if (attempt <= retry) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    throw lastError || new Error('GraphQL request failed')
  }

  // Query with caching
  const query = <TResult = T, TVariables = Record<string, any>>(
    operation: string,
    variables: TVariables = {} as TVariables,
    options: GraphqlOptions<TResult> = {}
  ) => {
    const { cache = true, server = true, ...opts } = { ...globalOptions, ...options }
    const cacheKey = cache ? JSON.stringify({ operation, variables, auth: opts.auth }) : undefined

    return useAsyncData<TResult>(
      async () => execute<TResult, TVariables>(operation, variables, opts),
      { key: cacheKey, server }
    )
  }

  // Direct mutation execution  
  const mutate = async <TResult = T, TVariables = Record<string, any>>(
    operation: string,
    variables: TVariables = {} as TVariables,
    options: GraphqlOptions<TResult> = {}
  ): Promise<TResult> => {
    return execute<TResult, TVariables>(operation, variables, { ...globalOptions, ...options })
  }

  // Authentication Methods
  const login = async (email: string, password: string, persistent = true) => {
    authState.loading.value = true
    authState.error.value = null

    try {
      const result = await execute<{
        login: { user: AuthUser; tokens: AuthTokens }
      }>(`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            user { id email name roles }
            tokens { accessToken refreshToken expiresAt }
          }
        }
      `, { email, password })

      const { user, tokens } = result.login
      
      setToken(tokens.accessToken, persistent)
      authState.user.value = user
      
      return user
    } catch (error) {
      authState.error.value = error instanceof Error ? error : new Error(String(error))
      throw authState.error.value
    } finally {
      authState.loading.value = false
    }
  }

  const logout = async () => {
    try {
      await execute('mutation { logout }', {}, { auth: true })
    } catch (error) {
      console.warn('Server logout failed:', error)
    } finally {
      clearToken()
    }
  }

  const getCurrentUser = async () => {
    try {
      const result = await execute<{ me: AuthUser }>(`
        query GetCurrentUser {
          me { id email name roles }
        }
      `, {}, { auth: true })
      
      authState.user.value = result.me
      return result.me
    } catch (error) {
      clearToken()
      return null
    }
  }

  // Pagination Helper
  const paginate = <TNode>(
    operation: string,
    variables: Record<string, any> = {},
    options: GraphqlOptions<Connection<TNode>> = {}
  ) => {
    const data = ref<TNode[]>([])
    const pageInfo = ref<PageInfo>({ hasNextPage: false, hasPreviousPage: false })
    const totalCount = ref(0)
    const loading = ref(false)

    const fetchPage = async (cursor?: string, direction: 'forward' | 'backward' = 'forward') => {
      loading.value = true
      try {
        const paginationVars = {
          ...variables,
          ...(direction === 'forward' 
            ? { first: 20, after: cursor }
            : { last: 20, before: cursor }
          )
        }

        const result = await execute<any>(operation, paginationVars, options)
        const connection = Object.values(result)[0] as Connection<TNode>

        if (direction === 'forward' || !cursor) {
          data.value = connection.edges.map(edge => edge.node)
        } else {
          data.value = connection.edges.map(edge => edge.node)
        }

        pageInfo.value = connection.pageInfo
        totalCount.value = connection.totalCount
      } finally {
        loading.value = false
      }
    }

    const loadMore = async () => {
      if (!pageInfo.value.hasNextPage) return

      loading.value = true
      try {
        const paginationVars = {
          ...variables,
          first: 20,
          after: pageInfo.value.endCursor
        }

        const result = await execute<any>(operation, paginationVars, options)
        const connection = Object.values(result)[0] as Connection<TNode>

        data.value.push(...connection.edges.map(edge => edge.node))
        pageInfo.value = connection.pageInfo
      } finally {
        loading.value = false
      }
    }

    return {
      data: readonly(data),
      pageInfo: readonly(pageInfo),
      totalCount: readonly(totalCount),
      loading: readonly(loading),
      fetchPage,
      loadMore,
      hasNextPage: computed(() => pageInfo.value.hasNextPage),
      hasPreviousPage: computed(() => pageInfo.value.hasPreviousPage)
    }
  }

  // File Operations
  const uploadFile = async (file: File, metadata: Record<string, any> = {}) => {
    const formData = new FormData()
    
    const operations = JSON.stringify({
      query: `
        mutation UploadFile($file: Upload!, $metadata: JSON) {
          uploadFile(file: $file, metadata: $metadata) {
            id filename mimetype size url
          }
        }
      `,
      variables: { file: null, metadata }
    })

    formData.append('operations', operations)
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }))
    formData.append('0', file)

    const headers: Record<string, string> = {}
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await $fetch<{ data: { uploadFile: FileUpload } }>(
      graphqlEndpoint,
      { method: 'POST', headers, body: formData }
    )

    if (response.errors?.length) {
      throw new Error(`Upload failed: ${JSON.stringify(response.errors)}`)
    }

    return response.data.uploadFile
  }

  // Initialize auth state
  if (typeof window !== 'undefined' && getToken()) {
    authState.isAuthenticated.value = true
    getCurrentUser().catch(() => {}) // Silent failure
  }

  return {
    // Core methods
    query,
    mutate,
    execute,

    // Auth methods
    login,
    logout,
    getCurrentUser,
    setToken,
    clearToken,

    // Pagination
    paginate,

    // File operations
    uploadFile,

    // Auth state
    isAuthenticated: readonly(authState.isAuthenticated),
    user: readonly(authState.user),
    authLoading: readonly(authState.loading),
    authError: readonly(authState.error),

    // Computed
    isLoggedIn: computed(() => authState.isAuthenticated.value && !!authState.user.value)
  }
}
