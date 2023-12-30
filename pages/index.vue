<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
    middleware: ['auth'],
    layout: 'default'
})

const message = ref('')
const selected = ref('personal')
const mensual = ref(true)
const amount = reactive({
    income: 34324,
    expenses: 5555,
    saves: 66,
    cards: 40
})


const balanceAcumulado = computed(() => {
    return 5555;
})


// const runtimeConfig = useRuntimeConfig()
// const appConfig = useAppConfig()

// // Use a static import for server-side compatibility
// import '~/assets/css/first.css'

// Caution: Dynamic imports are not server-side compatible
// import('~/assets/css/first.css')
// @import url("~/assets/css/second.css");
</script>

<style></style>

<template>
    <AppAlert v-if="message">
        This is an auto-imported component.
    </AppAlert>

    <div class="flex space-x-0">
        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'personal' }">
            <input type="radio" name="selector" class="form-radio sr-only" value="personal" v-model="selected"
                :class="{ 'bg-gray-500': selected === 'personal' }">
            <span class="ml-2">Personal</span>
        </label>

        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'familiar' }">

            <input type="radio" name="selector" class="form-radio sr-only" value="familiar" v-model="selected">
            <span class="ml-2">Familiar</span>
        </label>

        <label class="inline-flex items-center px-4 py-2 bg-gray-300 rounded-md active:bg-gray-500"
            :class="{ 'bg-gray-500': selected === 'negocio' }">

            <input type="radio" name="selector" class="form-radio sr-only" value="negocio" v-model="selected">
            <span class="ml-2">Negocio</span>
        </label>
    </div>

    Balance Acumulado
    <h1 class="text-4xl font-bold text-gray-800">${{ balanceAcumulado }}</h1>
    <div class="flex items-center">
        <input type="checkbox" id="mensual" value="1" class="hidden" v-model="mensual">
        <label for="mensual" class="flex items-center cursor-pointer">
            <div class="relative">
                <div class="w-10 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                <div
                    class="absolute w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform translate-x-0">
                </div>
            </div>
            <div class="ml-3 text-gray-700">Mensual</div>
        </label>
    </div>

    <div class="bg-gray-100 rounded-md p-4 max-h-60 overflow-y-auto">
        Detalle Mensual
        <!-- <ShowCategory category="Ingresos" :amount="amount.income"></ShowCategory>
        <ShowCategory category="Gastos" :amount="amount.expenses"></ShowCategory>
        <ShowCategory category="Ahorros" :amount="amount.saves"></ShowCategory>
        <ShowCategory category="Tarjetas" :amount="amount.cards"></ShowCategory> -->

        Resumen Mensual
        <!-- <CircularChart /> -->
    </div>


    <div class="p-4">
        <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
            <div class="px-6 py-4">
                <span class="badge mr-2">#photography</span>
                <span class="badge mr-2">#travel</span>
                <span class="badge">#winter</span>
            </div>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
.badge {
    @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;

    &:hover {
        @apply bg-gray-300;
    }
}
</style>