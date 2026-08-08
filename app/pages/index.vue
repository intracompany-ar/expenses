<script setup>
// @ts-nocheck
// import { useStoreAdvices } from 'commons_front'//No usar, falla importación, tengo que desarrollarlo como un modulo
// const storeAdvices = useStoreAdvices()
// storeAdvices.success('hola')
const storeMonthYear = useMonthYearStore();
const route = useRoute()

definePageMeta({
    // middleware: ['auth.global'],
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
    
    <v-container max-width="800">
        <div class="pt-2">
            <b class="text-h5">Saldo de Caja</b>
            <div class="text-center" v-if="balanceAcumulado">
                <h1 class="text-4xl font-bold text-white">${{ balanceAcumulado }}</h1>
            </div>
            <!-- <MensualSwitch/> -->
        </div>

        <hr class="my-4">
        
        <h5 class="text-h5 text-white">Detalle Mensual</h5>
        
        <ShowCategory v-on:expose="setChildMethod" color="success"
            route-show="/journal-entries-by-account/in" route-create="/create-journal-entry/in" category="Ingresos">
            <v-icon icon="fas fa-circle-dollar-to-slot"></v-icon>
        </ShowCategory>
        <ShowCategory v-on:expose="setChildMethod" color="deep-orange" route-show="/journal-entries-by-account/out"
            route-create="/create-journal-entry/out" category="Egresos">
            <v-icon icon="fas fa-money-check-dollar"></v-icon>
        </ShowCategory>
        <!-- <ShowCategory color="bg-yellow-500" category="Ahorros"></ShowCategory>
        <ShowCategory color="bg-blue-500" category="Tarjetas"></ShowCategory> -->
        <!-- Resumen Mensual -->
        <!-- <CircularChart /> -->
        
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
                    <v-icon icon="fas fa-link"></v-icon>
                    Instalar APP/PWA
                </a>
            </div>
        </div>
    </v-container>
</template>