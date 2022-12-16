import { defineStore } from 'pinia'

const modules = import.meta.glob('@/stores/*.js', {
  import: 'default',
  eager: true
})

export default defineNuxtPlugin((nuxtApp) => {
  const store = Object.entries(modules)
    .reduce((output, [path, module]) => {
      const { id } = path.match(/(?<id>\w+).js$/).groups
      output[id] = defineStore(id, module)()
      return output
    }, {})

  return {
    provide: {
      store
    }
  }
})
