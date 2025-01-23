import { defineStore, acceptHMRUpdate } from 'pinia';

interface UserState {
	isAuthenticated: boolean;
	user: {
		id: number | null;
		lastname: string | null;
		firstname: string | null;
		email: string | null;
		status: string | null;
	};
}

export const useUserStore = defineStore({
	id: 'useUserStore',
	state: (): UserState => ({
		isAuthenticated: false,
		user: {
			id: null,
			lastname: null,
			firstname: null,
			email: null,
			status: null,
		},
	}),
	persist: true,
	actions: {
		async login(credentials: { email: string; password: string }) {
			const { login } = useDirectusAuth();

			try {
				const response = await login(credentials.email, credentials.password);
				await this.setUserData();
			} catch (e: any) {
				if (e.data.errors[0].extensions.code === 'INVALID_CREDENTIALS') {
					return {
						error: 'Adresse mail ou mot de passe incorrect',
						status: 'error',
					};
				} else if (e.data.errors[0].extensions.code === 'INVALID_PAYLOAD') {
					return { error: 'Champs invalides', status: 'error' };
				}

				return { error: e.data.message, status: 'error' };
			}

			navigateTo('/');
			return { error: 'Connexion réussie', status: 'success' };
		},

		async setUserData() {
			const user = useDirectusUsers();
			const userData = await user.readMe();
			console.log(userData);

			this.user.id = userData.id;
			this.user.lastname = userData.last_name;
			this.user.firstname = userData.first_name;
			this.user.email = userData.email;
			this.user.status = userData.status;
			this.isAuthenticated = true;
		},

		async logout() {
			const { logout } = useDirectusAuth();

			try {
				await logout();
				this.resetState();
			} catch (e) {
				return { error: 'Erreur lors de la déconnexion', status: 'error' };
			}

			navigateTo('/');
		},

		resetState(): void {
			this.user.id = null;
			this.user.lastname = null;
			this.user.firstname = null;
			this.user.email = null;
			this.user.status = null;
			this.isAuthenticated = false;
		},

		async register(values: {
			firstname: string;
			lastname: string;
			email: string;
			password: string;
			confPassword: string;
		}): Promise<any> {
			try {
				const response: any = await $fetch('/api/auth/register', {
					method: 'POST',
					body: {
						firstname: values.firstname,
						lastname: values.lastname,
						email: values.email,
						password: values.password,
						confPassword: values.confPassword,
					},
				});
			} catch (e: any) {
				if (e.data.message) {
					return { error: e.data.message, status: 'error' };
				}
				return { error: e, status: 'error' };
			}

			return {
				error:
					'Inscription réussie ! Un email de confirmation vous a été envoyé.',
				status: 'success',
			};
		},
	},
});

// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
