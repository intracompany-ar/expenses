<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
	middleware: ['guest']
})

const form = ref({
	// email: 'fulano@neuper.com.ar',
	name: 'adpalarich',
	password: 'a33922990',
	application_id: 1 // Le tengo que poner un valor nuevo a expenses
})

const auth = useAuthStore()

async function login() {
	if (auth.isLoggedIn) { return navigateTo('/') }

	const { error } = await auth.login(form.value)

	if (!error.value) { return navigateTo('/') }
}
</script>

<template>
	<form @submit.prevent="login">
		<input type="text" v-model="form.name" />
		<input type="password" v-model="form.password" />
		<button type="submit">Login</button>
	</form>
</template>

<style scoped></style>
