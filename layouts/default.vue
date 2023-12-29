<script lang="ts" setup>
	const auth = useAuthStore()
</script>

<template>
	<div>
		<pre>{{ auth.user }}</pre>
		<button v-if="auth.isLoggedIn" v-on:click="auth.logout">Logout</button>
		<ul>
			<li>
				<NuxtLink to="/">Home</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/login">Login</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/auth-only">Auth Only</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/guest-only">Guest Only</NuxtLink>
			</li>
		</ul>

		<slot />
	</div>
</template>

<style scoped></style>

