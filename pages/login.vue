<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
	middleware: ['guest'],
	layout: false
})

const form = ref({
	// email: 'fulano@neuper.com.ar',
	name: 'adpalarich',
	password: 'a33922990',
	application_id: 1 // Le tengo que poner un valor nuevo a expenses
})

const auth = useAuthStore()

async function login() {
	console.log('login')
	if (auth.isLoggedIn) { return navigateTo('/') }
	const { error } = await auth.login(form.value)
	if (!error.value) { return navigateTo('/') }
}

function disableButton() {
	const button = document.querySelector('button[type="submit"]')
	button?.setAttribute('disabled', 'disabled')
}
</script>

<template>
	<AuthenticationCard>
		<template #logo>
			<!-- Logo -->
			<!-- <img src="/img/logo.png" alt="Logo" class="mx-auto h-12 w-auto" /> -->
		</template>

		<template #content>
			<div class="mb-4 font-medium text-sm text-green-600">
				<!-- Status -->
			</div>

			<div class="container mt-4">
				<div class="flex justify-center">
					<div class="sm:offset-2 sm:col-span-11 md:offset-4 md:col-span-4">
						<form @submit.prevent="login" v-on:submit="disableButton">
							<input type="text" v-model="form.name" class="border rounded py-2 px-3" />
							<input type="password" v-model="form.password" class="border rounded py-2 px-3" />
							<br>
							<button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
						</form>
					</div>
				</div>
			</div>
		</template>
	</AuthenticationCard>
</template>

<style scoped></style>
