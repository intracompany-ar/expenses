<script lang="ts" setup>
const route = useRoute()

definePageMeta({
	middleware: ['auth'],
	layout: 'simple'
})


const lines = ref([]);

onMounted(() => {
	getRows()
})

async function getRows() {
	try {
		const url = `/api/journalEntry/index/${route.params.month}/${route.params.year}/${route.params.accountId}`;
		const { data } = await useApiFetch(url);
		lines.value = data.value;
	} catch (error) {
		console.error('Error al obtener datos:', error);
	}
}

</script>

<template>
	<div class="row pt-2 text-gray-50">
		<div class="col-12 text-gray-50">
			Cuenta <b>{{ lines[0]?.account.name ?? route.params.accountId }}</b>
		</div>
	</div>

	<hr>

	<v-list lines="one">
		<v-list-item v-for="(row, index) in lines" :key="index"
			:title="$dayjs(row.journal_entry.posting_date).format('DD/MM/YYYY')"
			:subtitle="row.journal_entry.observation"
		>
			<div class="col-6 text-end">
				${{ Math.round((row.credit - row.debit) * 100) / 100 }}
			</div>
		</v-list-item>
	</v-list>

	<v-sheet class="d-flex mb-6 bg-surface-variant text-white" :class="{ 'bg-red-300': route.params.inOut == 'out', 'bg-green-300': route.params.inOut == 'in' }">
		<v-sheet class="ma-2 pa-2 me-auto">Total</v-sheet>
		<v-sheet class="ma-2 pa-2">$ {{ lines ? Math.round(lines.reduce((acc, row) => acc + (row.credit - row.debit), 0) * 100) / 100 : 0 }}</v-sheet>
	</v-sheet>
</template>

<style></style>