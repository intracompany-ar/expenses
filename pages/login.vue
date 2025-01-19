<script setup>
import { definePageMeta } from '#imports'

const authStore = useAuth();

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
	<div v-if="errors" class="mb-4 font-medium text-sm text-red-600">
		{{ errors.name ? (errors.name.length > 0 ? errors.name[0] : '') : '' }}
	</div>

	<v-container class="d-flex align-center justify-center" style="height: 100vh;">
		<v-card class="pa-5" min-width="400" max-width="900">
			<v-card-title class="d-flex align-center justify-center py-5 my-5">
				<a class="text-white text-h3" href="https://iceo.ar">IceO</a>
				<div class="ms-4">
					<v-img
						:width="60"
						aspect-ratio="16/9"
						src="/img/IceSoloV3_256x256.png" 
						></v-img>
				</div>
			</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="loguear">
					<v-text-field
						label="Usuario"
						v-model="userCredentials.name"
						type="name"
						required
					/>
						<!-- :rules="[rules.required, rules.email]" -->
	
					<v-text-field
						label="Contraseña"
						v-model="userCredentials.password"
						type="password"
						required
					/>
						<!-- :rules="[rules.required]" -->
					<v-btn
						class="mt-4"
						color="primary"
						block
						type="submit"
					>
					Ingresar
					</v-btn>
				</v-form>
			</v-card-text>
			<!-- <v-card-actions>
				<v-btn text color="secondary" @click="goToRegister">Crear cuenta</v-btn>
			</v-card-actions> -->
		</v-card>
	</v-container>
</template>
