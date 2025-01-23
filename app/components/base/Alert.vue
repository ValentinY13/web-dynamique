<template>
	<div>
		<div
			class="flex items-center p-4 text-sm tracking-normal border"
			role="alert"
			:class="
				type === 'error'
					? 'text-red-800 border-red-300 bg-red-50'
					: 'text-success border-success bg-green-50'
			">
			<Icon
				name="ph:info-fill"
				size="24"
				class="mr-2"
				:class="type === 'error' ? 'bg-alert' : 'bg-success'" />
			<span class="sr-only">Info</span>
			<div>
				<span class="font-medium">{{ message }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		message: { type: String, required: true },
		type: { type: String, default: 'error' },
	});
</script>

<style></style>
