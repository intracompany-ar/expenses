<script setup>
// @ts-nocheck
// import { useStoreAdvices } from 'commons_front'//No usar, falla importación, tengo que desarrollarlo como un modulo
// const storeAdvices = useStoreAdvices()
// storeAdvices.success('hola')

const storeMonthYear = useMonthYearStore();
const route = useRoute()

definePageMeta({
    middleware: ['auth'],
    layout: 'default'
})

const message = ref(route.query.message ?? '')

const { data: balanceAcumulado } = await useApiFetch('/api/journalEntry/balance')

let showCategoryGetRows = null;

const setChildMethod = (method) => { showCategoryGetRows = method; };

function getBalances() {
    if (showCategoryGetRows) {
        showCategoryGetRows(storeMonthYear.month, storeMonthYear.year);
    }
}
</script>

<template>
    <!-- SIN USO POR AHORA <SelectPresupuesto/> -->

    <div class="container-fluid">
        <AppAlert v-if="message" :message="message" />

        <MonthYearSelect v-on:selected="getBalances()" />


        <div class="row tw-pt-2">
            <b>Saldo de Caja</b>
            <div class="col-12 tw-text-center">
                <h1 class="tw-text-4xl tw-font-bold tw-text-gray-800">${{ balanceAcumulado }}</h1>
            </div>
            <!-- <MensualSwitch/> -->
        </div>
        <hr>

        <div class="row tw-pt-2">
            <b>Detalle Mensual</b>
            <div class="tw-bg-gray-100 tw-rounded-md p-4 tw-max-h-100 tw-overflow-y-auto">
                <ShowCategory v-on:expose="setChildMethod" color="tw-bg-green-400 tw-my-2"
                    route-show="/journal-entries-by-account/in" route-create="/create-journal-entry/in" category="Ingresos">
                    <fa-icon icon="fa-solid fa-coins" />
                </ShowCategory>
                <ShowCategory v-on:expose="setChildMethod" color="tw-bg-red-400"
                    route-show="/journal-entries-by-account/out" route-create="/create-journal-entry/out"
                    category="Egresos"><fa-icon icon="fa-solid fa-hand-holding-dollar" /></ShowCategory>
                <!-- <ShowCategory color="bg-yellow-500" category="Ahorros"></ShowCategory>
                <ShowCategory color="bg-blue-500" category="Tarjetas"></ShowCategory> -->
                <!-- Resumen Mensual -->
                <!-- <CircularChart /> -->
            </div>
        </div>


    </div>
</template>