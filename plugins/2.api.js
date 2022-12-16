import axios from 'axios'

const CANCELLED_STATUS_CODE = 499

export default defineNuxtPlugin (nuxtApp => {
  const { baseURL, redirectOn401, authorization } = nuxtApp.$config.public.api

  const instance = axios.create({ baseURL })

  function errorHandler(error) {
    let { status } = (error.response || {})
    status = error.code === 'ERR_CANCELED'
      ? CANCELLED_STATUS_CODE
      : status || 500

    if (status === 401) {
      const cookie = useCookie(authorization.cookie)
      cookie.value = null

      if (redirectOn401) {
        const { path, replace } = redirectOn401
        navigateTo(path, {
          replace
        })
      }
    }

    throw {
      status,
      ...(
        error?.response?.data || {
          message: error.message || 'Sorry, an unexpected error occurred.',
        }
      )
    }
  }

  instance.interceptors.request.use(
    (req) => {
      const cookie = useCookie(authorization.cookie)
      if (cookie.value) {
        req.headers[authorization.header] = `${authorization.type} ${cookie.value}`
      }
      return req
    },
    (error) => errorHandler(error)
  )

  instance.interceptors.response.use(
    (res) => {
      const { property, cookie: authCookieKey } = authorization
      if (property in (res.data || {})) {
        const cookie = useCookie(authCookieKey)
        cookie.value = res.data[property]
      }
      return res.data
    },
    (error) => errorHandler(error)
  )

  return {
    provide: {
      api: instance,
    }
  }
})
