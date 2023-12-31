<script lang="ts" setup>
const auth = useAuthStore()

const isOpen = ref(false)
</script>

<template>
	<nav class="bg-gray-800 p-4">
		<div class="container mx-auto flex items-center justify-between">
			<NuxtLink class="text-white text-lg font-bold" to="/">
				<!-- <Icon name="dollar"/> -->
				Gastos Financiera
			</NuxtLink>
			
			<div class="flex space-x-4">
				<span class="text-white hover:text-gray-300">{{ auth.user?.name }}</span>
				<div class="text-white hover:text-gray-300">
					<div class="relative inline-block text-left">
						<button type="button" @click="isOpen = !isOpen"
							class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus:border-gray-800 focus:ring focus:ring-gray-300 active:bg-gray-800">
							<Icon name="et:gears"/>
						</button>
		
		
						<div v-show="isOpen" @click.away="isOpen = false" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Usuario</a> -->
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Categorías</a> -->
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Balance</a> -->
							<button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" v-if="auth.isLoggedIn" v-on:click="auth.logout">Cerrar sesión</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<slot />
</template>

<style scoped></style>

