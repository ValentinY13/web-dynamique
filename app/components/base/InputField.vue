<template>
	<div>
		<div class="relative">
			<input
				:name="name"
				:id="name"
				:type="isPasswordVisible ? 'text' : type"
				@input="$emit('update:modelValue', $event.target?.value)"
				:placeholder="placeholder"
				:autocomplete="autocomplete"
				class="input input-filled peer text-sm focus:placeholder-secondary" />
			<label class="input-filled-label text-sm" :for="name">{{ label }}</label>
			<span class="input-filled-focused"></span>
			<Icon
				v-if="type === 'password'"
				@click="togglePasswordVisibility"
				class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary cursor-pointer"
				:name="
					isPasswordVisible
						? 'material-symbols-light:visibility-outline'
						: 'material-symbols-light:visibility-off-outline'
				"
				size="24" />
		</div>
		<BaseInputAlert v-if="errors">{{ errors }}</BaseInputAlert>
	</div>
</template>

<script lang="ts" setup>
	import { ref, computed } from 'vue';

	const props = defineProps({
		name: { type: String, required: true },
		label: { type: String, required: true },
		type: {
			type: String,
			default: 'text',
			validator: (value: string) =>
				['text', 'email', 'password'].includes(value),
		},
		placeholder: { type: String, default: '' },
		autocomplete: { type: String, default: 'off' },
		errors: { type: String, default: '' },
	});

	const emit = defineEmits(['update:modelValue']);

	const isPasswordVisible = ref(false);

	const togglePasswordVisibility = () => {
		if (props.type === 'password') {
			isPasswordVisible.value = !isPasswordVisible.value;
		}
	};
</script>

<style></style>
