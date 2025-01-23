<template>
	<NuxtLink :to="to" class="text-lg text-primary group relative w-max">
		<span class="group-hover:text-secondary"><slot /></span>
		<span
			class="absolute -bottom-1 left-1/2 w-0 transition-all duration-500 h-px bg-secondary group-hover:w-3/6"></span>
		<span
			class="absolute -bottom-1 right-1/2 w-0 transition-all h-px duration-500 bg-secondary group-hover:w-3/6"></span>
	</NuxtLink>
</template>

<script lang="ts" setup>
	defineProps({
		to: { type: String, required: true },
	});
</script>

<style></style>
