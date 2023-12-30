<script setup>

const props = defineProps(['category', 'amount', 'icon', 'routeTo'])

</script>

<template>
    <div>
        {{ props.category }}
        {{ props.amount }}
        {{ props.icon }}
        <NuxtLink :to="props.routeTo">Detalle</NuxtLink>
        <NuxtLink :to="props.routeTo">Nuevo</NuxtLink>
    </div>
</template>