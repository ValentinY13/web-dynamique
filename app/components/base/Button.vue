<template>
	<button
		:type="type"
		class="w-fit h-fit px-1 py-3.5 relative group overflow-hidden font-medium border-2 border-secondary">
		<!-- Éléments pour l'effet de remplissage -->
		<span
			class="absolute top-1/2 left-1/2 w-0 h-[120%] transition-all duration-700 ease-out transform -translate-x-1/2 -translate-y-1/2 bg-secondary group-hover:w-[120%]">
		</span>
		<!-- Contenu du bouton -->
		<span
			class="relative z-10 text-primary group-hover:text-white py-3 px-8 text-sm font-bold">
			<slot />
		</span>
	</button>
</template>

<script lang="ts" setup>
	interface ButtonProps {
		type?: 'button' | 'submit' | 'reset';
	}

	withDefaults(defineProps<ButtonProps>(), {
		type: 'button',
	});
</script>

<style></style>
