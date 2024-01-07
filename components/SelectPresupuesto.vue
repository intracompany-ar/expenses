<script lang="ts" setup>

const selected = ref('personal')
</script>

<template>
  <div class="tw-flex tw-space-x-0">
    <label class="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded-md tw-active:bg-gray-500"
        :class="{ 'bg-gray-500': selected === 'personal' }">
        <input type="radio" name="selector" class="tw-form-radio tw-sr-only" value="personal" v-model="selected"
            :class="{ 'bg-gray-500': selected === 'personal' }">
        <span class="ml-2">Personal</span>
    </label>

    <label class="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded-md tw-active:bg-gray-500"
        :class="{ 'tw-bg-gray-500': selected === 'familiar' }">

        <input type="radio" name="selector" class="tw-form-radio tw-sr-only" value="familiar" v-model="selected">
        <span class="ml-2">Familiar</span>
    </label>

    <label class="tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded-md tw-active:bg-gray-500"
        :class="{ 'bg-gray-500': selected === 'negocio' }">

        <input type="radio" name="selector" class="tw-form-radio tw-sr-only" value="negocio" v-model="selected">
        <span class="ml-2">Negocio</span>
    </label>
</div>
</template>

<style>

</style>