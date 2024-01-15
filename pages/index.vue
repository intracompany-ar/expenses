<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'

const storeMonthYear = useMonthYearStore();

definePageMeta({
    middleware: ['auth'],
    layout: 'default'
})

const message = ref('')

const {data: balanceAcumulado} = await useApiFetch('/api/journalEntry/balance')

let showCategoryGetRows = null;

const setChildMethod = (method) => { showCategoryGetRows = method; };

function getBalances() {
    if (showCategoryGetRows) {
        showCategoryGetRows(storeMonthYear.month, storeMonthYear.year);
    }
}
</script>

<template>
    <AppAlert v-if="message">
        This is an auto-imported component.
    </AppAlert>

    <!-- SIN USO POR AHORA <SelectPresupuesto/> -->

    <div class="container-fluid">

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
                <ShowCategory v-on:expose="setChildMethod" color="tw-bg-green-400 tw-my-2" route-show="/show-journal-entry-by-account-in" in-out="in"  route-create="/create-income" category="Ingresos"/>
                <ShowCategory v-on:expose="setChildMethod" color="tw-bg-red-400" route-show="/show-journal-entry-by-account-out" in-out="out" route-create="/create-outcome" category="Egresos"/>
                <!-- <ShowCategory color="bg-yellow-500" category="Ahorros"></ShowCategory>
                <ShowCategory color="bg-blue-500" category="Tarjetas"></ShowCategory> -->
                <!-- Resumen Mensual -->
                <!-- <CircularChart /> -->
            </div>
        </div>


    </div>
</template>