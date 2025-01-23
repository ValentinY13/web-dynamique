<template>
	<Container class="flex flex-row h-fit gap-16 tracking-widest">
		<NuxtImg class="basis-1/2 max-h-lvh object-cover" src="/imgForm2.jpg" />
		<div class="w-full max-h-fit basis-1/2">
			<h1 class="text-3xl text-primary py-8">CONNEXION</h1>
			<BaseLoginForm />
			<div class="flex flex-col text-secondary mt-8 gap-4">
				<BaseModalForm />
				<button
					class="border-b border-secondary w-fit hover:text-primary hover:border-primary"
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls="middle-center-modal"
					data-overlay="#middle-center-modal">
					Mot de passe oublié ?
				</button>
				<HoverLink :to="'/account/register'">CREER UN COMPTE</HoverLink>
			</div>
		</div>
	</Container>
</template>

<script lang="ts" setup></script>

<style></style>
