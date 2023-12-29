<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div>
    Solo contenito para logueados loco
  </div>
</template>

<style scoped></style>
