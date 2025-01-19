<script lang="ts" setup>
</script>

<template>
	<nav class="bg-gray-800 p-2">
		<div class="container mx-auto flex items-center justify-between">
			<div class="text-white text-lg font-bold">
				<v-btn color="yellow" v-on:click="$router.back()">Volver</v-btn>
			</div>
		</div>
	</nav>

	<slot></slot>
</template>

<style scoped></style>

