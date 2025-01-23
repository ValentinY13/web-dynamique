import { z } from 'zod';
import isStrongPassword from 'validator/es/lib/isStrongPassword';

export default z
	.object({
		firstname: z
			.string({ required_error: 'Prenom obligatoire' })
			.trim()
			.min(2, { message: 'Prenom trop court' }),
		lastname: z
			.string({ required_error: 'Nom obligatoire' })
			.trim()
			.min(2, { message: 'Nom trop court' }),
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
		confPassword: z
			.string({ required_error: 'Confirmation obligatoire' })
			.trim()
			.min(6, { message: 'Mot de passe trop court' })
			.refine((value) => isStrongPassword(value), {
				message:
					'Le mot de passe doit contenir au moins : un symbole, une lettre minuscule, une lettre majuscule et un chiffre',
			}),
	})
	.refine((data) => data.password === data.confPassword, {
		message: 'Les mots de passe ne correspondent pas',
		// where error will appear
		path: ['confPassword'],
	});
