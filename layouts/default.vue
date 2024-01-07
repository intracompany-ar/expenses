<script lang="ts" setup>
const auth = useAuthStore()

const isOpen = ref(false)
</script>

<template>
	<nav class="tw-bg-gray-800 p-4">
		<div class="tw-container tw-mx-auto tw-flex tw-items-center tw-justify-between">
			<NuxtLink class="tw-text-white tw-text-lg tw-font-bold" to="/">
				<!-- <Icon name="dollar"/> -->
				Gastos Financiera
			</NuxtLink>
			
			<div class="tw-flex tw-space-x-4">
				<span class="tw-text-white tw-hover:text-gray-300">{{ auth.user?.name }}</span>
				<div class="tw-text-white tw-hover:text-gray-300">
					<div class="tw-relative tw-inline-block tw-text-left">
						<button type="button" @click="isOpen = !isOpen"
							class="tw-inline-flex tw-items-center tw-justify-center tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-bg-gray-700 tw-border tw-border-transparent tw-rounded-md tw-hover:bg-gray-600 tw-focus:outline-none tw-focus:border-gray-800 tw-focus:ring tw-focus:ring-gray-300 tw-active:bg-gray-800">
							<Icon name="et:gears"/>
						</button>
		
		
						<div v-show="isOpen" @click.away="isOpen = false" class="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-border tw-border-gray-200 tw-divide-y tw-divide-gray-100 tw-rounded-md tw-shadow-lg">
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Usuario</a> -->
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Categorías</a> -->
							<!-- <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Balance</a> -->
							<button class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-gray-100" v-if="auth.isLoggedIn" v-on:click="auth.logout">Cerrar sesión</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<slot />
</template>

<style scoped></style>

