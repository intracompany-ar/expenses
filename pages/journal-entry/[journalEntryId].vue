<script lang="ts" setup>

const route = useRoute()

definePageMeta({
    middleware: ['auth'],
    layout: 'simple'
})

const journalEntry = ref({});

onMounted(() => {
	getRows()
})

async function getRows() {
	try {
		const url = `/api/journalEntry/show/${route.params.journalEntryId}`;
		const { data } = await useApiFetch(url);
		journalEntry.value = data.value;
	} catch (error) {
		console.error('Error al obtener datos:', error);
	}
}


</script>

<template>
	<div class="container">



		<div class="row bg-blue-200">
			<div class="col-12 text-center">
				<h1>${{ journalEntry?.journal_entry_lines?.reduce((total, line) => total + parseFloat(line.debit), 0) }}
				</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<h5>{{ journalEntry?.observation }}</h5>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				{{ $dayjs(journalEntry?.posting_date).format('DD/MM/YYYY') }}
			</div>
		</div>

		<hr>

		<table>
			<thead>
				<tr>
					<th>Account</th>
					<th class="text-end">Credit</th>
					<th class="text-end">Debit</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="lines in journalEntry.journal_entry_lines">
					<td>{{ lines.account.name }}</td>
					<td class="text-end">{{ lines.credit != 0 ? Math.round(lines.credit * 100) / 100 : '' }}</td>
					<td class="text-end">{{ lines.debit != 0 ? Math.round(lines.debit * 100) / 100 : '' }}</td>
				</tr>
			</tbody>
		</table>

		<!-- Eliminar o actualizar -->
	</div>
</template>

<style></style>