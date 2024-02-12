<script setup>
    
    const mensual = ref(true)
</script>

<template>
    <div class="mb-3 ml-3">
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">

            <input type="checkbox" name="mensual" id="mensual"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                v-model="mensual" value="1">

            <label for="mensual" class="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"></label>
        </div>

        <label for="mensual" class="text-xs text-gray-700 dark:text-gray-500">Mensual</label>
    </div>
</template>