<script setup lang="ts">
// const runtimeConfig = useRuntimeConfig()
// const appConfig = useAppConfig()

// // Use a static import for server-side compatibility
// import '~/assets/css/first.css'

// Caution: Dynamic imports are not server-side compatible
// import('~/assets/css/first.css')
// @import url("~/assets/css/second.css");
</script>

<style>

</style>

<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <AppAlert>
            This is an auto-imported component.
        </AppAlert>
        
        <img src="~/assets/img/nuxt.png" alt="Discover Nuxt 3" />
        aaaa
    </div>
</template>