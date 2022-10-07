// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
			]
		}
	},

	buildModules: ['@nuxtjs/tailwindcss'],

	tailwindcss: {
		cssPath: '~/assets/css/tailwind.css',
		configPath: 'tailwind.config.js',
		exposeConfig: false,
		injectPosition: 0,
		viewer: true,
	},
})
