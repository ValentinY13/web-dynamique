import {
	createDirectus,
	rest,
	registerUser,
	readUsers,
	registerUserVerify,
	authentication,
	login,
	logout,
	passwordRequest,
	passwordReset,
} from '@directus/sdk';

const directusUrl = useRuntimeConfig().public.directusUrl;

const directusServer = createDirectus(directusUrl)
	.with(authentication('cookie', { autoRefresh: true }))
	.with(rest());

export {
	directusServer,
	registerUser,
	readUsers,
	registerUserVerify,
	login,
	logout,
	passwordRequest,
	passwordReset,
};
