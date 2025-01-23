import { directusServer, passwordReset } from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const email = body.email;

		if (!email) {
			throw createError({
				statusCode: 400,
				message: 'Adresse email manquante',
			});
		}

		const resetUrl = useRuntimeConfig().public.resetUrl;

		// Check unique email
		const isEmailExist = await directusServer.request(
			readUsers({
				filter: {
					email: {
						_eq: body.email,
					},
				},
				fields: ['email', 'status'],
			})
		);

		if (isEmailExist.length > 0 && isEmailExist[0].status !== 'active') {
			throw createError({
				statusCode: 400,
				message:
					"Adresse mail non associée à un compte actif, veuillez contacter l'administrateur",
			});
		} else if (isEmailExist.length === 0) {
			throw createError({
				statusCode: 400,
				message: 'Aucun compte associé à cette adresse mail',
			});
		}

		await directusServer.request(passwordRequest(email, resetUrl));

		return {
			error: 'Un email de réinitialisation de mot de passe vous a été envoyé',
			status: 'success',
		};
	} catch (e: any) {
		console.log(e.message);

		throw createError({
			statusCode: e.statusCode || 500,
			message: e.message || 'Une erreur inattendue est survenue',
		});
	}
});
