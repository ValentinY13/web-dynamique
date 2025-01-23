import {
	directusServer,
	registerUserVerify,
} from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	const token = getQuery(event).token as string;

	if (!token) {
		throw createError({
			statusCode: 400,
			message: 'Token manquant',
		});
	}

	try {
		const result = await directusServer.request(registerUserVerify(token));
		console.log('result verif', result);
		return { success: true, message: 'Adresse mail vérifiée avec succès' };
	} catch (e: any) {
		throw createError({
			statusCode: e.statusCode || 400,
			statusMessage: 'Lien invalide ou expiré.',
		});
	}
});
