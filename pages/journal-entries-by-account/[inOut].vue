<script setup>
const storeMonthYear = useMonthYearStore();

const route = useRoute()

definePageMeta({
    middleware: ['auth'],
    layout: 'simple'
})

const accounts = ref(null);
const errors = ref(null);

onMounted(() => {
    getRows()
})

async function getRows() {
    try {
        const url = `/api/journalEntry/indexIncomesByAccount/${route.params.inOut}/${storeMonthYear.month}/${storeMonthYear.year}`;
        const { data, error } = await useApiFetch(url);
        if (error.value) {
            throw error;
        }
        accounts.value = data.value;
    } catch (error) {
        errors.value = error.value?.data?.errors
        console.error('Error al obtener datos:', error);
    }
}
</script>

<template>
    <MonthYearSelect v-on:selected="getRows()" />

    <div class="tw-p-4 tw-mb-3 tw-text-white-100"
        :class="{ 'tw-bg-red-300': route.params.inOut == 'out', 'tw-bg-green-300': route.params.inOut == 'in' }">
        <h4>Total de {{ route.params.inOut == 'out' ? 'Gastos' : 'Ingresos' }}</h4>
        <!-- <h1>$ {{ balance }}</h1> -->
    </div>

    <div v-if="accounts">
        <div v-for="account in accounts" class="row">
            <div class="col-8">
                <NuxtLink
                    :to="'/journal-entry-line/' + storeMonthYear.month + '/' + storeMonthYear.year + '/' + account.account.id">
                    <small class="tw-text-gray-800"><b>{{ account?.account?.name }}</b></small>
                </NuxtLink>
            </div>
            <div class="col-4 text-end">
                <h5 class="tw-text-green-800 tw-font-bold">$ {{ Math.round(account?.balance * 100 / 100) }}</h5>
            </div>
            <hr>
        </div>
        <div v-if="errors" class="alert alert-danger" role="alert">
            <ul>
                <li v-for="error in errors">{{ error[0] }}</li>
            </ul>
        </div>
    </div>


    <!-- <div v-for="journalEntryLine in rows"  class="row">
		<div class="col-8" v-if="journalEntryLine.journal_entry">
			<small class="tw-text-gray-800"><b>{{ journalEntryLine.journal_entry.observation }}</b></small>
			<br>
			{{ dayjs(journalEntryLine.journal_entry.posting_date).format('DD/MM/YYYY') }}
		</div>
		<div class="col-4 text-end">
			<h5 class="tw-text-green-800 tw-font-bold">$ {{ Math.round(journalEntryLine.credit * 100/ 100) }}</h5>
			
		</div>
		<hr>
	</div> -->
</template>