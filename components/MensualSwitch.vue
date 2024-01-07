<script setup>
    
    const mensual = ref(true)
</script>

<template>
    <div class="mb-3 ml-3">
        <div class="tw-relative tw-inline-block tw-w-10 tw-mr-2 tw-align-middle tw-select-none tw-transition tw-duration-200 ease-in">
            
            <input type="checkbox" name="mensual" id="mensual" class="tw-toggle-checkbox tw-absolute tw-block tw-w-6 tw-h-6 tw-rounded-full tw-bg-white tw-border-4 tw-appearance-none tw-cursor-pointer" v-model="mensual" value="1">
            
            <label for="mensual" class="tw-toggle-label tw-block tw-overflow-hidden tw-h-6 tw-rounded-full tw-cursor-pointer"></label>
        </div>

        <label for="mensual" class="tw-text-xs tw-text-gray-700 tw-dark:text-gray-500">Mensual</label>
    </div>
</template>