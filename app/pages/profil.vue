<template>
	<div>
		<Container>
			<h1 class="text-3xl pb-10">PROFIL</h1>
			<pre>{{ userStore.user }}</pre>
			<BaseButton @click="handleLogout">SE DECONNECTER</BaseButton>
		</Container>
	</div>
</template>

<script lang="ts" setup>
	// User store
	const userStore = useUserStore();

	definePageMeta({
		middleware: 'auth',
	});

	const handleLogout = async () => {
		await userStore.logout();
	};
</script>

<style></style>
