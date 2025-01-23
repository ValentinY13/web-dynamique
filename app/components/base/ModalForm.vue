<template>
	<div>
		<div
			id="middle-center-modal"
			class="overlay modal overlay-open:opacity-100 modal-middle hidden"
			role="dialog"
			tabindex="-1">
			<div class="modal-dialog overlay-open:opacity-100">
				<div class="modal-content">
					<div class="modal-header">
						<h3 class="modal-title">Demande de nouveau mot de passe</h3>
						<button
							type="button"
							class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
							aria-label="Close"
							data-overlay="#middle-center-modal">
							<span class="icon-[tabler--x] size-4"></span>
						</button>
					</div>
					<form @submit.prevent="onSubmit">
						<div class="modal-body pt-0">
							<div class="mb-4">
								<label class="label label-text" for="email"> Email </label>
								<input
									type="email"
									name="email"
									v-model="email"
									placeholder="exemple@gmail.com"
									class="input rounded-none"
									id="modal-email"
									autocomplete="email" />
							</div>
							<BaseInputAlert>{{ errors.email }}</BaseInputAlert>
							<BaseAlert
								v-if="errorMessage"
								:message="errorMessage"
								:type="errorStatus" />
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-soft btn-secondary rounded-none"
								data-overlay="#middle-center-modal">
								Fermer
							</button>
							<button type="submit" class="btn btn-primary rounded-none">
								Confirmer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import z from 'zod';
	const errorMessage = ref('');
	const errorStatus = ref('');

	// Validation schema
	const validationSchema = toTypedSchema(
		z.object({
			email: z
				.string({ required_error: 'Adresse mail obligatoire' })
				.trim()
				.email({ message: 'Email non valide' }),
		})
	);

	// Validation setup
	const { handleSubmit, errors } = useForm({
		validationSchema,
	});

	const { value: email } = useField('email');

	const onSubmit = handleSubmit(async (value) => {
		try {
			const response = await $fetch('/api/auth/forgot-password', {
				method: 'POST',
				body: {
					email: value.email,
				},
			});
			if (response.error) {
				errorMessage.value = response.error;
				errorStatus.value = response.status;
			}
		} catch (e: any) {
			errorMessage.value = e.data.message;
			errorStatus.value = 'error';
		}
	});
</script>

<style></style>
