<script lang="ts" setup>
const route = useRoute()

definePageMeta({
	middleware: ['auth'],
	layout: 'simple'
})


const journalEntryLines = ref([]);

onMounted(() => {
	getRows()
})

async function getRows() {
	try {
		const url = `/api/journalEntry/index/${route.params.month}/${route.params.year}/${route.params.accountId}`;
		const { data } = await useApiFetch(url);
		journalEntryLines.value = data.value;
	} catch (error) {
		console.error('Error al obtener datos:', error);
	}
}

</script>

<template>
	<div class="container">

		<div class="row pt-2">
			<div class="col-12">
				<h5>{{ journalEntryLines[0]?.account.name ?? route.params.accountId }}</h5>
			</div>
		</div>

		<hr>

		<div class="row" v-for="row in journalEntryLines">
			<div class="col-6">
				<NuxtLink :to="`/journal-entry/${row.journal_entry.id}`">
					<b>{{ row.journal_entry.observation }}</b>
				</NuxtLink>
				<br>
				{{ $dayjs(row.journal_entry.posting_date).format('DD/MM/YYYY') }}
			</div>
			<div class="col-6 text-end">
				${{ Math.round((row.credit - row.debit) * 100) / 100 }}
			</div>
			<hr>
		</div>

		<hr>
		<div class="row">
			<div class="col-6">
				<b>Total</b>
			</div>
			<div class="col-6 text-end">
				<b>{{ Math.round(journalEntryLines.reduce((acc, row) => acc + (row.credit - row.debit), 0) * 100) / 100
				}}</b>
			</div>
		</div>
	</div>
</template>

<style></style>