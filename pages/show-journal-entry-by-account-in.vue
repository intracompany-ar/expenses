<script setup>
const storeMonthYear = useMonthYearStore();

definePageMeta({
    middleware: ['auth'],
    layout: 'simple'
})


const accounts = ref(null);

defineProps(['inOut'])

onMounted(() => {
	getRows()
})

async function getRows() {
	try {
		const url = `/api/journalEntry/indexIncomesByAccount/in/${storeMonthYear.month}/${storeMonthYear.year}`;
		const { data } = await useApiFetch(url);
		accounts.value = data.value;
	} catch (error) {
		console.error('Error al obtener datos:', error);
	}
}
</script>


<template>
	<MonthYearSelect v-on:selected="getRows()" />

	<div class="tw-bg-red-300 tw-p-4 tw-mb-3 tw-text-white-100">
		<h4>Total de Gastos</h4>
		<!-- <h1>$ {{ balance }}</h1> -->
	</div>

	<div v-if="accounts">
		<div v-for="account in accounts" class="row">
			<div class="col-8">
					<NuxtLink :to="'/journal-entry-line/'+storeMonthYear.month+'/'+storeMonthYear.year+'/'+account.account.id">
						<small class="tw-text-gray-800"><b>{{ account?.account?.name }}</b></small>
					</NuxtLink>
			</div>
			<div class="col-4 text-end">
				<h5 class="tw-text-green-800 tw-font-bold">$ {{ Math.round(account?.balance * 100 / 100) }}</h5>
			</div>
			<hr>
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



<style></style>