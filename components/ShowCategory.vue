<script setup>
const storeMonthYear = useMonthYearStore();

const emit = defineEmits()

onMounted(() => {
    getRows()
    emit('expose', getRows);
});

const amount = ref(0);

const props = defineProps(['category', 'icon', 'routeShow', 'routeCreate', 'color'])

async function getRows() {
    console.log('getRows')
    let route = props.category == 'Ingresos' ? 'balanceIncomes' : 'balanceOutcomes';
    const month = storeMonthYear.month;
    const year = storeMonthYear.year;
    console.log(route)
    const response = await useApiFetch(`/api/journalEntry/${route}/${month}/${year}`);
    console.log(response)
    amount.value = response.data;
}
</script>

<template>
    <div class="container mx-auto grid grid-cols-4 gap-4">
        <NuxtLink :to="props.routeShow" class="col-span-3 py-2 p-4 rounded-lg" :class="props.color ?? 'bg-green-300'">

            <h3 class="text-xl font-bold">
                <slot></slot> {{ props.category }}
            </h3>
            <h1 class="text-xl font-bold">$ {{ amount ?? 0 }}</h1>
            {{ props.icon }}
        </NuxtLink>

        <NuxtLink :to="props.routeCreate" class="col-span-1 rounded-lg text-center pt-4 text-lg"
            :class="props.color ?? 'bg-green-500'">
            <UIcon class="text-4xl" name="i-heroicons-plus-circle-16-solid" />
        </NuxtLink>
    </div>
</template>