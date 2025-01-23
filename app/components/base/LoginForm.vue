<template>
	<div>
		<form @submit.prevent="onSubmit" class="flex flex-col gap-8 mt-4">
			<BaseInputField
				name="email"
				label="ADRESSE MAIL*"
				type="email"
				placeholder="Votre adresse mail"
				v-model="email"
				autocomplete="email"
				:errors="errors.email" />
			<BaseInputField
				name="password"
				label="MOT DE PASSE*"
				type="password"
				placeholder="Votre mot de passe"
				v-model="password"
				:errors="errors.password" />

			<BaseAlert
				v-if="errorMessage"
				:message="errorMessage"
				:type="errorStatus" />
			<BaseButton :type="'submit'">SE CONNECTER</BaseButton>
		</form>
	</div>
</template>

<script lang="ts" setup>
	import LoginSchema from '~/utils/login.schema';

	// User store
	const userStore = useUserStore();

	const errorMessage = ref('');
	const errorStatus = ref('');

	// Validation schema
	const validationSchema = toTypedSchema(LoginSchema);

	// Validation setup
	const { handleSubmit, errors } = useForm({
		validationSchema,
	});

	const { value: email } = useField('email');
	const { value: password } = useField('password');

	const onSubmit = handleSubmit(async (values) => {
		const response = await userStore.login(values);

		if (response.error) {
			errorMessage.value = response.error;
			errorStatus.value = response.status;
		}
	});
</script>

<style></style>
