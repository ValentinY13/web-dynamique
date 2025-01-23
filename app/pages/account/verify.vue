<template>
	<div>
		<Container>
			<h1 class="text-3xl py-8">PAGE DE VERIFICATION</h1>

			<!-- Bouton pour se connecter après validation -->
			<div v-if="verified">
				<h2 class="text-2xl py-4">Compte vérifié avec succès !</h2>
				<p class="pb-4">Vous pouvez maintenant vous connecter.</p>
				<NuxtLink to="/account/login">
					<BaseButton>SE CONNECTER</BaseButton>
				</NuxtLink>
			</div>

			<!-- Message de succès ou d'erreur -->
			<p v-if="alert" class="tracking-normal text-sm" :class="alertClass">
				{{ alert }}
			</p>

			<!-- Indicateur de chargement -->
			<p v-if="loading" class="tracking-normal text-sm text-gray-600">
				Chargement en cours...
			</p>
		</Container>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();

	const verified = ref(false);
	const alert = ref('');
	const loading = ref(true);

	const alertClass = computed(() =>
		alert.value.includes('succès') ? 'text-green-600' : 'text-red-600'
	);

	const token = route.query.token as string;

	try {
		await useFetch('/api/auth/verify', {
			query: { token },
		});

		verified.value = true;
	} catch (e: any) {
		alert.value = e.data.message;
	} finally {
		loading.value = false;
	}
</script>

<style></style>
