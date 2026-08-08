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
    <v-row class="my-4 rounded" :class="'bg-'+props.color">
        <v-col
            cols="9"
        >
            <NuxtLink :to="props.routeShow" class="col-span-3 py-2 p-4 rounded-lg" :class="props.color ?? 'bg-green-300'">
        
                <h3 class="text-xl font-bold">
                    <slot></slot> {{ props.category }}
                    <span class="text-xl font-bold">$ {{ amount ?? 0 }}</span>
                </h3>
                {{ props.icon }}
            </NuxtLink>
        </v-col>

        <v-col
            cols="3"
        >
            <NuxtLink :to="props.routeCreate">
                <v-icon icon="fas fa-plus"></v-icon>
            </NuxtLink>
            
        </v-col>
    </v-row>
</template>