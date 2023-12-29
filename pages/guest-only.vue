<script lang="ts" setup>
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: ['guest']
})
</script>

<template>
  <div>
Invitado
  </div>
</template>

<style scoped></style>
