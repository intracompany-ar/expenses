<script lang="ts" setup>
const authStore = useAuth();
</script>

<template>
	<NuxtPwaManifest />
	<NuxtLoadingIndicator />
	<NuxtErrorBoundary>
		<template #error="{ error }">
			<p>An error occurred: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>

	<v-app>
		<v-app-bar :elevation="2">
		
			<v-app-bar-title>
				<NuxtLink class="text-white" to="/">
					<v-icon icon="fas fa-coins"></v-icon>  IceO Finanzas
				</NuxtLink>
			</v-app-bar-title>
			
			<v-spacer></v-spacer>

			<span class="text-white hover:text-gray-300 pt-1">
				<div v-if="authStore.user">
					{{authStore.user?.name}}
				</div>
			</span>

			<v-menu>
				<template v-slot:activator="{ props }">
					<v-btn icon="fas fa-cog" variant="text" v-bind="props"></v-btn>
				</template>
				<v-list>
					<v-list-item v-on:click="authStore.logout">
						Cerrar sesión
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		
		<v-main>
			<slot></slot>
		</v-main>
	</v-app>
</template>
<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Usuario</a> -->
<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Categorías</a> -->
<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Balance</a> -->
<!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->

<style scoped></style>