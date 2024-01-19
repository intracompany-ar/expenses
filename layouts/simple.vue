<script lang="ts" setup>
</script>

<template>
	<nav class="tw-bg-gray-800 p-2">
		<div class="tw-container tw-mx-auto tw-flex tw-items-center tw-justify-between">
			<div class="tw-text-white tw-text-lg tw-font-bold">
				<button class="btn btn-secondary" @click="$router.back()">Volver</button>
			</div>
		</div>
	</nav>

	<slot />
</template>

<style scoped></style>

