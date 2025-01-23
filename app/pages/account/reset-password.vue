<template>
	<div>
		<Container>
			<h1 class="text-3xl py-8">CHOISISSEZ VOTRE NOUVEAU DE MOT DE PASSE</h1>
			<form @submit.prevent="onSubmit" class="flex flex-col gap-8 mt-4 w-1/4">
				<BaseInputField
					name="password"
					label="MOT DE PASSE*"
					type="password"
					placeholder="Votre mot de passe"
					v-model="password"
					:errors="errors.password" />
				<BaseInputField
					name="confPassword"
					label="CONFIRMER LE MOT DE PASSE*"
					type="password"
					placeholder="Confirmer votre mot de passe"
					v-model="confPassword"
					:errors="errors.confPassword" />
				<BaseAlert
					v-if="errorMessage"
					:message="errorMessage"
					:type="errorStatus" />
				<BaseButton :type="'submit'">Confirmer</BaseButton>
			</form>
		</Container>
	</div>
</template>

<script lang="ts" setup>
	// middleware à ajouter
	import ResetPassword from '~/utils/resetPassword.schema';
	const route = useRoute();

	const errorMessage = ref('');
	const errorStatus = ref('');
	const token = route.query.token as string;

	const validationSchema = toTypedSchema(ResetPassword);

	const { handleSubmit, errors } = useForm({
		validationSchema,
	});

	const { value: password } = useField('password');
	const { value: confPassword } = useField('confPassword');

	const onSubmit = handleSubmit(async (values) => {
		try {
			const response = await $fetch('/api/auth/reset-password', {
				method: 'POST',
				body: {
					password: values.password,
					confPassword: values.confPassword,
					token: token,
				},
			});
			navigateTo('/account/login');
			console.log(response);
		} catch (e: any) {
			errorMessage.value = e.data.message;
			errorStatus.value = 'error';
		}
	});
</script>

<style></style>
