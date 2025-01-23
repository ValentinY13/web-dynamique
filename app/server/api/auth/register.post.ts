import RegisterSchema from '~/utils/register.schema';
import {
	directusServer,
	registerUser,
	readUsers,
} from '~/server/utils/directus-server';
import z from 'zod';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);

		// Valider les données avec Zod
		const validatedData = RegisterSchema.parse(body);
		console.log('validatedData', validatedData);

		const verifyUrl = useRuntimeConfig().public.verifyEmailUrl;
		const options = {
			first_name: validatedData.firstname,
			last_name: validatedData.lastname,
			verification_url: verifyUrl,
		};

		// Check unique email
		const isEmailExist = await directusServer.request(
			readUsers({
				filter: {
					email: {
						_eq: validatedData.email,
					},
				},
				fields: ['email'],
			})
		);

		if (isEmailExist.length > 0) {
			throw createError({
				statusCode: 400,
				message: 'Adresse mail déjà associée à un compte',
			});
		}

		// Créer l'utilisateur avec Directus
		const response = await directusServer.request(
			registerUser(validatedData.email, validatedData.password, options)
		);
	} catch (e: any) {
		console.log('ERROR e', e);

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
