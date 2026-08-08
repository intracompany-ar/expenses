<script lang="ts" setup>

const selected = ref('personal')
</script>

<template>
    <div class="flex space-x-0">
        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'personal' }">
            <input type="radio" name="selector" class="form-radio sr-only" value="personal" v-model="selected"
                :class="{ 'bg-gray-500': selected === 'personal' }">
            <span class="ml-2">Personal</span>
        </label>

        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'familiar' }">

            <input type="radio" name="selector" class="form-radio sr-only" value="familiar" v-model="selected">
            <span class="ml-2">Familiar</span>
        </label>

        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'negocio' }">

            <input type="radio" name="selector" class="form-radio sr-only" value="negocio" v-model="selected">
            <span class="ml-2">Negocio</span>
        </label>
    </div>
</template>

<style></style>