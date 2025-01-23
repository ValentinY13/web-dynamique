<template>
	<div>
		<div class="tooltip [--placement:bottom]">
			<slot />
			<span
				class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
				role="tooltip">
				<span class="tooltip-body">{{ message }}</span>
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		message: { type: String, required: true },
	});
</script>

<style></style>
