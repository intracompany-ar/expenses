<script setup>
import {useMonthYearStore} from '~/stores/useMonthYearStore'
const storeMonthYear = useMonthYearStore();

function getBalances()
{
    getRows()
}

const accounts = ref(null);
async function getRows()
{
	// const {data: rows} = useApiFetch(`/api/journalEntry/indexIncomes/${month}/${year}`);
	const response = await useApiFetch(`/api/journalEntry/indexIncomesByAccount/${storeMonthYear.month}/${storeMonthYear.year}`);
	accounts.value = response.data;
}

</script>


<template>

	<MonthYearSelect v-on:selected="getBalances()" />

	<div class="tw-bg-red-300 tw-p-4 tw-mb-3 tw-text-white-100">
		<h4>Total de Gastos</h4>
		<!-- <h1>$ {{ balance }}</h1> -->
	</div>

{{accounts}}
	<div v-for="account in accounts"  class="row">
		<div class="col-8">
			{{ account }}
			<small class="tw-text-gray-800"><b>{{ account?.account?.name }}</b></small>
		</div>
		<div class="col-4 text-end">
			<h5 class="tw-text-green-800 tw-font-bold">$ {{ Math.round(account?.balance * 100/ 100) }}</h5>
		</div>
		<hr>
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



<style>

</style>