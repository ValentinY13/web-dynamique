// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	modules: [
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/tailwindcss',
		'@nuxt/icon',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@vee-validate/nuxt',
		'nuxt-directus-next',
	],

	build: {
		transpile: ['@vuepic/vue-datepicker'],
	},

	runtimeConfig: {
		public: {
			directusUrl: process.env.DIRECTUS_URL,
			verifyEmailUrl: process.env.VERIFICATION_EMAIL_URL,
			resetUrl: process.env.PASSWORD_RESET_URL,
		},
	},

	directus: {
		url: process.env.DIRECTUS_URL,
		moduleConfig: {
			autoRefresh: true,
			readMeQuery: {
				fields: ['id', 'email', 'first_name', 'last_name', 'status'],
			},
		},
	},

	piniaPluginPersistedstate: {
		storage: 'cookies',
	},

	googleFonts: {
		families: {
			Montserrat: true,
			PlayfairDisplay: true,
		},
	},
});
