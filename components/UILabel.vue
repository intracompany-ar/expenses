<script setup>
const props = defineProps(['for'])
</script>

<template>
    <label class="pl-4 text-gray-800 text-lg" :for="props.for"><slot></slot></label>
</template>