<script setup>

const props = defineProps(['category', 'amount', 'icon', 'routeTo', 'color'])

</script>

<template>
    <div class="flex">
        <div class="rounded-lg  p-4 m-4" :class="props.color ?? 'bg-green-500'">
            {{ props.category }}
            {{ props.amount }}
            {{ props.icon }}
            <NuxtLink :to="props.routeTo">Detalle</NuxtLink>
            <NuxtLink :to="props.routeTo">Nuevo</NuxtLink>
        </div>

        <NuxtLink class="rounded-lg w-15 h-15 p-4 m-4" :class="props.color ?? 'bg-green-500'" :to="props.routeTo">+</NuxtLink>
    </div>
</template>