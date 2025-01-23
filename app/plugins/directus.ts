import {
	createDirectus,
	rest,
	readItem,
	readItems,
	registerUser,
	readUsers,
	registerUserVerify,
	updateItem,
	logout,
	authentication,
	readMe,
} from '@directus/sdk';

export default defineNuxtPlugin(() => {
	const directusUrl = useRuntimeConfig().public.directusUrl;

	const directus = createDirectus(directusUrl)
		.with(authentication('cookie', { autoRefresh: true }))
		.with(rest());

	return {
		provide: {
			directus,
			readItem,
			readItems,
			registerUser,
			readUsers,
			registerUserVerify,
			updateItem,
			logout,
			readMe,
		},
	};
});
