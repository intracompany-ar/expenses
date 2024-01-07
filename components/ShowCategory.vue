<script setup>

const props = defineProps(['category', 'amount', 'icon', 'routeTo', 'color'])

</script>

<template>
    <div class="tw-flex">
        <div class="tw-rounded-lg  tw-p-4 tw-m-4" :class="props.color ?? 'tw-bg-green-500'">
            
            <NuxtLink :to="props.routeTo">
                {{ props.category }}
                <span>{{ props.amount }}</span>
                

                {{ props.icon }}
            </NuxtLink>
        </div>

        <NuxtLink class="tw-rounded-lg tw-w-15 tw-h-15 tw-p-4 tw-m-4" :class="props.color ?? 'tw-bg-green-500'" :to="props.routeTo">+</NuxtLink>
    </div>
</template>