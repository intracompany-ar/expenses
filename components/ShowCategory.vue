<script setup>
import {useMonthYearStore} from '~/stores/useMonthYearStore'
const storeMonthYear = useMonthYearStore();

const emit = defineEmits()

onMounted(() => { 
    getRows()
    emit('expose', getRows);
});

const amount = ref(null);

const props = defineProps(['category', 'icon', 'routeShow', 'routeCreate', 'color'])

async function getRows()
{
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
            <div class="col-8 mx-2 tw-rounded-lg" :class="props.color ?? 'tw-bg-green-300'">
                <NuxtLink :to="props.routeShow">
                    <h3>{{ props.category }}</h3>
                    <h1>$ {{ amount }}</h1>
                    {{ props.icon }}
                </NuxtLink>
            </div>
            <div class="col-2 mx-2 tw-rounded-lg text-center pt-3" :class="props.color ?? 'tw-bg-green-500'">
                <NuxtLink :to="props.routeCreate">
                    <fa-icon icon="fa-solid fa-plus"/>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>