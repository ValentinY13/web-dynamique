<template>
	<div>
		<Container>
			<h1 class="text-3xl pb-10">ACCUEIL</h1>
			<p v-if="userStore.isAuthenticated">Bienvenue {{ user?.first_name }} !</p>
			<pre>{{ userStore.user }}</pre>
		</Container>
	</div>
</template>

<script lang="ts" setup>
	const userStore = useUserStore();
	const { user } = useDirectusUsers();
</script>

<style></style>
