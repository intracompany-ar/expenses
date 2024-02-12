<script lang="ts" setup>
</script>

<template>
	<nav class="bg-gray-800 p-2">
		<div class="container mx-auto flex items-center justify-between">
			<div class="text-white text-lg font-bold">
				<button class="btn btn-secondary" @click="$router.back()">Volver</button>
			</div>
		</div>
	</nav>

	<slot />
</template>

<style scoped></style>

