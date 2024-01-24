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
    <div class="container-fluid">
        <div class="row">
            <NuxtLink :to="props.routeShow" class="col-8 tw-mx-2 tw-py-2 tw-rounded-lg" :class="props.color ?? 'tw-bg-green-300'">
                
                <h3><slot></slot> {{ props.category }}</h3>
                <h1>$ {{ amount ?? 0 }}</h1>
                {{ props.icon }}
            </NuxtLink>

            <NuxtLink :to="props.routeCreate" class="col-2 mx-2 tw-rounded-lg tw-text-center tw-pt-7 tw-text-lg"
                :class="props.color ?? 'tw-bg-green-500'">
                <fa-icon icon="fa-solid fa-plus" />
            </NuxtLink>
        </div>
    </div>
</template>