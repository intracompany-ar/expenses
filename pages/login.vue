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
			<div class="container mt-4 tw-bg-indigo-300 py-2">
				<div class="row justify-content-center">
					<div class="col-offset-2 col-11 col-md-offset-4 col-md-4">
						<form @submit.prevent="loguear">

							<fieldset>


								<div class="form-floating">
									<input type="text" id="name" class="form-control form-control-lg" placeholder=" "
										name="name" v-model="userCredentials.name" required autofocus maxlength="25"
										style="padding-right: 3rem;" />
									<label class="form-label text-muted fs-5" for="name">Usuario</label>
								</div>

								<div class="pt-2">
									<div class="form-floating">
										<input type="password" name="password" id="password" required placeholder=" "
											autocomplete="current-password" v-model="userCredentials.password"
											data-error="some error" class="form-control form-control-lg">
										<label class="form-label text-muted fs-5" for="password">Contraseña</label>
									</div>
								</div>
								<div v-if="errors" class="tw-mb-4 tw-font-medium tw-text-sm tw-text-red-600">
									{{ errors.name ? (errors.name.length > 0 ? errors.name[0] : '') : '' }}
								</div>

								<div class="text-center mt-4">
									<button type="submit" class="btn btn-secondary btn-neuper btn-lg">Login</button>
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
