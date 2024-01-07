<script setup>
import { definePageMeta } from '#imports'

definePageMeta({
	middleware: ['guest'],
	layout: false
})

const form = ref({
	// email: 'fulano@neuper.com.ar',
	name: '',
	password: '',
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
			<div class="tw-mb-4 tw-font-medium tw-text-sm tw-text-green-600">
				<!-- Status -->
			</div>

			<div class="tw-container tw-mt-4">
				<div class="tw-flex tw-justify-center">
					<div class="tw-sm:offset-2 tw-sm:col-span-11 tw-md:offset-4 tw-md:col-span-4">
						<form @submit.prevent="login" v-on:submit="disableButton">

							<input type="text" v-model="form.name" name="name" class="tw-border tw-rounded tw-py-2 tw-px-3 tw-my-2" />

							<br>

							<input type="password" v-model="form.password" name="password" class="tw-border tw-rounded tw-py-2 tw-px-3" />
							<br>
							<div class="tw-text-center">
								<button type="submit" class="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded tw-my-2">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</template>
	</AuthenticationCard>
</template>

<style scoped></style>
