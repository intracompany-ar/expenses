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

const { $pwa } = useNuxtApp()

// onMounted(() => {
//     // if ($pwa.offlineReady) toast.success('App ready to work offline')
// })

function installPwa()
{
    console.log($pwa)
    $pwa.install()
}

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
    <AppAlert v-if="message" :message="message" />
    <MonthYearSelect v-on:selected="getBalances()" />

    <div class="container mx-auto">
        <div class="flex flex-col pt-2">
            <b class="text-lg">Saldo de Caja</b>
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-800">${{ balanceAcumulado }}</h1>
            </div>
            <!-- <MensualSwitch/> -->
        </div>

        <hr class="my-4">

        <div class="flex flex-col pt-2">
            <b class="text-lg">Detalle Mensual</b>
            <div class="bg-gray-100 rounded-md p-4 max-h-100 overflow-y-auto">
                <ShowCategory v-on:expose="setChildMethod" color="bg-green-400 my-2"
                    route-show="/journal-entries-by-account/in" route-create="/create-journal-entry/in" category="Ingresos">
                    <UIcon name="i-heroicons-currency-dollar-solid" />
                </ShowCategory>
                <ShowCategory v-on:expose="setChildMethod" color="bg-red-400" route-show="/journal-entries-by-account/out"
                    route-create="/create-journal-entry/out" category="Egresos">
                    <UIcon name="i-heroicons-solid-credit-card" />
                </ShowCategory>
                <!-- <ShowCategory color="bg-yellow-500" category="Ahorros"></ShowCategory>
                <ShowCategory color="bg-blue-500" category="Tarjetas"></ShowCategory> -->
                <!-- Resumen Mensual -->
                <!-- <CircularChart /> -->
            </div>
        </div>
    </div>

    <div v-if="$pwa?.isPWAInstalled">
        PWA Instalado

        <div v-if="$pwa.needRefresh">
            <span>
                Hay nuevo contenido disponible, haga click en recargar para actualizar.
            </span>
            <button @click="$pwa.updateServiceWorker()">
                Recargar
            </button>
        </div>
    </div>
    <div v-else>
        <div class="m-2 mt-4">
            <a class="p-2 rounded-md font-bold border-pink bg-blue-500" href="" v-on:click.prevent="installPwa">
                <UIcon name="i-heroicons-solid-link" /> 
                Instalar APP/PWA
            </a>
        </div>
    </div>
</template>