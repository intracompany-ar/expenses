<script setup>
import { definePageMeta } from '#imports'

const authStore = useAuthStore();

definePageMeta({
	middleware: ['login'],
	layout: 'guest-layout'
})

const errors = ref([])
const status = ref('') // En laravel lo uso para session flash, desde el backend
const userCredentials = ref({
	// email: 'fulano@neuper.com.ar',
	name: '',
	password: '',
	application_id: 8 // Le tengo que poner un valor nuevo a expenses
})

async function loguear() {
	disableButton()
	try {
		await authStore.login(userCredentials.value)
		enableButton()
	} catch (error) {
		errors.value = error.value?.data?.errors
		enableButton()
	}
}

function disableButton() {
	const button = document.querySelector('button[type="submit"]')
	button?.setAttribute('disabled', 'disabled')
}

function enableButton() {
	const button = document.querySelector('button[type="submit"]')
	button?.removeAttribute('disabled')
}
</script>

<template>
	<div v-if="status" class="mb-4 font-medium text-sm text-green-600">
		{{ status }}
	</div>

	<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<a class="mx-auto h-10 w-auto" href="https://iceo.ar">
				<h2 class="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
					IceO
					<img class="h-12 w-auto inline" src="/img/IceSoloV3_256x256.png" alt="IceO" />
				</h2>
			</a>
		</div>
	
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" action="#" method="POST"  @submit.prevent="loguear">
				<div>
					<label for="name" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
					<div class="mt-2">
						<input id="email" v-model="userCredentials.name" name="name" type="name" autocomplete="name" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
					</div>
				</div>
				<div v-if="errors" class="mb-4 font-medium text-sm text-red-600">
					{{ errors.name ? (errors.name.length > 0 ? errors.name[0] : '') : '' }}
				</div>
		
				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
						<div class="text-sm">
						<!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
						</div>
					</div>
					<div class="mt-2">
						<input v-model="userCredentials.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2" />
					</div>
				</div>
		
				<div>
					<button type="submit" class="flex w-1/2 mx-auto justify-center rounded-full bg-gray-500 px-3 py-3 text-lg font-bold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 ">ENTRAR</button>
				</div>
			</form>
	
			<!-- <p class="mt-10 text-center text-sm text-gray-500">
			Not a member?
			{{ ' ' }}
			<a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
			</p> -->
		</div>
	</div>
</template>
