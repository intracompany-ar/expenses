<script setup>
import { definePageMeta } from '#imports'

const authStore = useAuthStore();

definePageMeta({
	middleware: ['login'],
	layout: false
})

const errors = ref([])
const userCredentials = ref({
	// email: 'fulano@neuper.com.ar',
	name: '',
	password: '',
	application_id: 8 // Le tengo que poner un valor nuevo a expenses
})

async function loguear() {
	try {
		await authStore.login(userCredentials.value)
	} catch (error) {
		errors.value = error.value?.data?.errors
	}
	// disableButton()
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
			<div class="container mt-4 bg-indigo-300 py-2">
				<div class="row justify-content-center">
					<div class="col-offset-2 col-11 col-md-offset-4 col-md-4">
						<form @submit.prevent="loguear">

							<fieldset class="p-2">
								<UILabel for="name">Usuario</UILabel>
								<UInput id="name" placeholder=" " name="name" v-model="userCredentials.name" required
									autofocus maxlength="25"
									class="w-full p-4 text-lg rounded focus:outline-none focus:border-blue-500">
								</UInput>

								<div class="pt-2">
									<UILabel for="password">Contraseña</UILabel>
									<UInput type="password" id="password" placeholder=" " name="password"
										v-model="userCredentials.password" required autofocus
										class="w-full p-4 text-lg rounded focus:outline-none focus:border-blue-500">
									</UInput>
								</div>

								<div v-if="errors" class="mb-4 font-medium text-sm text-red-600">
									{{ errors.name ? (errors.name.length > 0 ? errors.name[0] : '') : '' }}
								</div>

								<div class="text-center mt-4">
									<UButton color="blue" type="submit" class="p-3" :ui="{ rounded: 'rounded-full' }">ENTRAR</UButton>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>

		</template>
	</AuthenticationCard>
</template>

<style scoped></style>
