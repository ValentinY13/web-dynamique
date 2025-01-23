/** @type {import('tailwindcss').Config} */
export default {
	content: ['./node_modules/flyonui/dist/js/*.js'],
	theme: {
		extend: {
			colors: {
				primary: '#7b3b24',
				secondary: '#c7623e',
				alert: '#b91c1c',
				success: '#22c55e',
			},

			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				serif: ['PlayfairDisplay', 'serif'],
			},
		},
	},
	plugins: [require('flyonui'), require('flyonui/plugin')],

	flyonui: {
		theme: false,
		darkTheme: false,

		themes: [
			{
				light: {
					...require('flyonui/src/theming/themes')['light'],
					primary: '#7b3b24',
					secondary: '#c7623e',
					error: '#b91c1c',
				},
			},
		],
	},
};
