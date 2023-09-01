import { defineNuxtPlugin, useCookie, navigateTo } from 'nuxt/app'
import axios, { AxiosInstance, AxiosError } from 'axios'
import type { ApiPluginOptions } from '../types/plugins'

export default defineNuxtPlugin<{ [name: string]: AxiosInstance }>(
  (nuxtApp) => {
    const { name = 'api', ...options } = nuxtApp.$config.public
      .api as ApiPluginOptions
    const { baseURL, redirectOn401, authorization } = options

    const instance = axios.create({ baseURL })

    function manageToken(action: 'get' | 'set' | 'clear', value?: any): any {
      const cookie = useCookie(authorization!.cookie as string)
      if (action === 'get') {
        return cookie.value
      }
      cookie.value = action === 'set' ? value : null
    }

    function errorHandler(error: AxiosError) {
      let { status } = error.response || {}
      status = error.code === 'ERR_CANCELED' ? 499 : status || 500

      if (status === 401) {
        manageToken('clear')

        if (redirectOn401) {
          const { path, replace } = redirectOn401
          return navigateTo(path, {
            replace,
          })
        }
      }

      throw {
        request: error.request,
        status,
        ...(error?.response?.data || {
          message: error.message || 'Sorry, an unexpected error occurred.',
        }),
      }
    }

    instance.interceptors.request.use(
      (req) => {
        try {
          const token = manageToken('get')
          if (token) {
            req.headers[authorization!.header as string] = `${
              authorization!.type as string
            } ${token}`
          }
        } catch {
          console.info('Nuxt instance error ignored.')
        }

        return req
      },
      (error: AxiosError) => errorHandler(error),
    )

    instance.interceptors.response.use(
      (res) => {
        try {
          const token = get(res.data, authorization?.property as string)
          if (token) {
            manageToken('set', token)
          }
        } catch {
          console.info('Nuxt instance error ignored.')
        }

        return res
      },
      (error: AxiosError) => errorHandler(error),
    )

    return {
      provide: {
        [name]: instance,
      },
    }
  },
)

function get(object: object, key: string): any {
  return key
    .split('.')
    .reduce((res: object, k: string): any => res[k as keyof object], object)
}
