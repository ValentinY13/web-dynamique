import ResetPassword from '~/utils/resetPassword.schema';
import z from 'zod';
import { directusServer, passwordReset } from '~/server/utils/directus-server';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		const token = body.token;

		// Valider les données avec Zod
		const validatedData = ResetPassword.parse({
			password: body.password,
			confPassword: body.confPassword,
		});

		const response = await directusServer.request(
			passwordReset(token, validatedData.password)
		);
	} catch (e: any) {
		// Erreur du schéma de validation
		if (e instanceof z.ZodError) {
			throw createError({
				statusCode: 400,
				message: 'Validation des données échouée',
				data: e.errors,
			});
		}

		throw createError({
			statusCode: e.statusCode || 500,
			message: e.message || 'Une erreur inattendue est survenue',
		});
	}
});
