<script setup lang="ts">
import { definePageMeta } from '#imports'
// // Use a static import for server-side compatibility
// import '~/assets/css/first.css'

// Caution: Dynamic imports are not server-side compatible
// import('~/assets/css/first.css')
// @import url("~/assets/css/second.css");

definePageMeta({
    middleware: ['auth'],
    layout: 'default'
})

const message = ref('')

const amount = reactive({
    income: 34324,
    expenses: 5555,
    saves: 66,
    cards: 40
})


const balanceAcumulado = computed(() => {
    // TODO: traer desde backend
    return 5555;

})
</script>

<template>
    <AppAlert v-if="message">
        This is an auto-imported component.
    </AppAlert>
    <!-- SIN USO POR AHORA <SelectPresupuesto/> -->

    Balance Acumulado
    <h1 class="text-4xl font-bold text-gray-800">${{ balanceAcumulado }}</h1>

    <!-- <MensualSwitch/> -->
    <div class="bg-gray-100 rounded-md p-4 max-h-100 overflow-y-auto">
        Detalle Mensual
        <ShowCategory color="bg-green-500" route-to="/create-income" category="Ingresos" :amount="amount.income"></ShowCategory>
        <ShowCategory color="bg-red-500" route-to="/create-expense" category="Gastos" :amount="amount.expenses"></ShowCategory>
        <!-- <ShowCategory color="bg-yellow-500" category="Ahorros" :amount="amount.saves"></ShowCategory>
        <ShowCategory color="bg-blue-500" category="Tarjetas" :amount="amount.cards"></ShowCategory> -->

        <!-- Resumen Mensual -->
        <!-- <CircularChart /> -->
    </div>
</template>