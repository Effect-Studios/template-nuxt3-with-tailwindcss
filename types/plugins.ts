/**
 * API plugin options. See each property for details.
 * @property {string} name
 * @property {string} baseURL
 * @property {false | object} redirectOn401
 * @property {object} authorization
 */
export interface ApiPluginOptions {
  /**
   * This refers to the name by which the plugin will be access from `useNuxtApp()`. Assuming you change the name to `server`, the plugin would then be accessible at `useNuxtApp().$server`
   * @default ```js
   * 'api'
   * ```
   * @example
   * ```js
   * const { $api } = useNuxtApp()
   * async function login(): Promise<void> {
   *   await $api.post('/auth/login/')
   *   const profile = await $api('/users/me')
   *   ...
   * }
   * ```
   */
  name?: string
  /**
   * The base url of the api being integrated
   * @default process.env.API_BASE_URL
   */
  baseURL?: string | any
  /**
   * If defined with an object, the api plugin would redirect to the specified ```path``` when an error with a 401 status code is received from the network response. When redirecting, the current path will be replaced with the destination path if the ```replace``` property is set to true.
   *
   * This `redirectOn401` property can however be set to `false` if you don't want a redirect to happen when such an event as described above occurs.
   * @default
   * ```js
   * {
   *   path: '/auth/login',
   *   replace: true,
   * }
   * ```
   */
  redirectOn401?:
    | false
    | {
        path: string
        replace?: boolean
      }
  /**
   * These authorization properties allow the api plugin to manage access, storage, and removal of the user's authentication token during the lifetime of the app. This also allows the plugin to automatically include the authorization header for requests when a token is available.
   * @default
   * ```js
   * {
   *   property: 'auth_token',
   *   header: 'Authorization',
   *   type: 'Token',
   *   cookie: 'token',
   * }
   * ```
   */
  authorization?: {
    /**
     * Refers to the lookup key that is used to access the token from the API's response data. This can be a regular string eg; `auth_token`, or a dot notation string eg; `token.access`
     * @default ```js
     * 'auth_token'
     * ```
     */
    property?: string
    /**
     * The name of the authorization header that is used for making authenticated API requests
     * @default ```js
     * 'Authorization'
     * ```
     */
    header?: string
    /**
     * Refers to the type of token that the server uses to authenticate requests. This can be; `Token`, `Bearer`, etc
     * @default ```js
     * 'Token'
     * ```
     */
    type?: string
    /**
     * The name of the key used to store the token in the browser's cookies.
     * @default ```js
     * 'token'
     * ```
     */
    cookie?: string
  }
}
