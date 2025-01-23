<template>
	<div>
		<form @submit="onSubmit" class="flex flex-col gap-8">
			<BaseInputField
				name="firstname"
				label="PRENOM*"
				type="text"
				placeholder="Votre prénom"
				v-model="firstname"
				autocomplete="given-name"
				:errors="errors.firstname" />

			<BaseInputField
				name="lastname"
				label="NOM*"
				type="text"
				placeholder="Votre nom"
				v-model="lastname"
				autocomplete="family-name"
				:errors="errors.lastname" />

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
				autocomplete="new-password"
				:errors="errors.password" />

			<BaseInputField
				name="confPassword"
				label="CONFIRMER LE MOT DE PASSE*"
				type="password"
				placeholder="Confirmez votre mot de passe"
				v-model="confPassword"
				autocomplete="new-password"
				:errors="errors.confPassword" />

			<BaseAlert
				v-if="errorMessage"
				:message="errorMessage"
				:type="errorStatus" />
			<BaseButton :type="'submit'">S'inscrire</BaseButton>
		</form>
	</div>
</template>

<script lang="ts" setup>
	import RegisterSchema from '~/utils/register.schema';
	import { useUserStore } from '~/stores/user';

	const userStore = useUserStore();
	const errorMessage = ref('');
	const errorStatus = ref('');

	const validationSchema = toTypedSchema(RegisterSchema);

	const { handleSubmit, errors } = useForm({
		validationSchema,
	});

	const { value: firstname } = useField('firstname');
	const { value: lastname } = useField('lastname');
	const { value: email } = useField('email');
	const { value: password } = useField('password');
	const { value: confPassword } = useField('confPassword');

	const onSubmit = handleSubmit(async (values) => {
		const response = await userStore.register(values);

		if (response.error) {
			errorMessage.value = response.error;
			errorStatus.value = response.status;
		}
	});
</script>

<style></style>
