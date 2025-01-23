<template>
	<section
		:class="['py-8 mx-auto', !fullWidth ? 'px-6 lg:px-16 lg:py-24' : '']">
		<slot />
	</section>
</template>

<script lang="ts" setup>
	interface ContainerProps {
		fullWidth?: boolean;
	}

	withDefaults(defineProps<ContainerProps>(), {
		fullWidth: false,
	});
</script>

<style></style>
