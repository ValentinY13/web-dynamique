import { z } from 'zod';
import isStrongPassword from 'validator/es/lib/isStrongPassword';

export default z.object({
	email: z
		.string({ required_error: 'Adresse mail obligatoire' })
		.trim()
		.email({ message: 'Email non valide' }),
	password: z
		.string({ required_error: 'Mot de passe obligatoire' })
		.trim()
		.min(6, { message: 'Mot de passe trop court' })
		.refine((value) => isStrongPassword(value), {
			message:
				'Le mot de passe doit contenir au moins : un symbole, une lettre minuscule, une lettre majuscule et un chiffre',
		}),
});
