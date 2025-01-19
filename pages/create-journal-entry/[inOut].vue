<script setup>
import dayjs from 'dayjs';
const route = useRoute()

const rows = ref([]);
const errors = ref(null);

const dataForm = reactive({
	amount: 0,
	journal_entry_template_id: '',
	observation: '',
	posting_date: null, // dayjs().format('YYYY-MM-DD')
});

onMounted(() => {
	getTemplates()
});


async function getTemplates() {
	const { data } = await useApiFetch(`/api/journalEntryTemplate/indexInOut/${route.params.inOut}`);
	rows.value = data.value;
}

async function store() {
	try {
		dataForm.posting_date = dayjs(dataForm.posting_date).format('YYYY-MM-DD');
		const { data, error } = await useApiFetch('/api/journalEntry/store', {
			method: 'POST',
			body: dataForm
		});
		if (error.value) {
			throw error;
		}
		return navigateTo({ path: '/', query: { message: 'Asiento insertado con éxito!' } })
	} catch (error) {
		errors.value = error.value?.data?.errors
	}

}
</script>

<template>
	<v-form v-on:submit.prevent="store" id="form-create">
		<v-container>
			<v-row>
				<v-col
					class="text-center"
					offset="4"
					cols="4"
					md="4"
					>
					
					<v-number-input
						controlVariant="default"
						label="IMPORTE"
						:inset="false"
						v-model="dataForm.amount"
						name="amount"
					></v-number-input>

				</v-col>
			</v-row>

			<v-row>
				<v-col
					class="text-center"
					cols="6"
					md="4"
					>
					<v-select
						v-model="dataForm.journal_entry_template_id"
						label="Cuenta"
						:items="rows"
						item-title="name"
						item-value="id"
						id="category-select" 
						name="journal_entry_template_id"
					></v-select>
				</v-col>
				<v-col
					class="text-center"
					cols="6"
					md="4"
					>
					<v-text-field
						label="En Concepto de:"
						v-model="dataForm.observation"
						name="observation"
						>
					</v-text-field>
				</v-col>
			</v-row>

			<v-row class="text-center">
				<v-col
					class="text-center"
					cols="6"
					md="4"
					>
					<v-date-input  
						label="Fecha Contable"
						v-model="dataForm.posting_date" 
					></v-date-input>
				</v-col>

				<v-col>
					<v-btn type="submit" :color="route.params.inOut == 'out' ? 'red' : 'green'" size="x-large">INSERTAR {{ (route.params.inOut == 'out' ? 'GASTO' : 'INGRESO') }}</v-btn>
				</v-col>
			</v-row>

			<div v-if="errors" class="alert alert-danger  col-span-3" role="alert">
				<ul>
					<li v-for="error in errors">{{ error[0] }}</li>
				</ul>
			</div>
		</v-container>
	</v-form>
</template>


<!--       
	Prsupuesto: familiar, personal, negocio
	Fecha: hoy, ayer o seleccionar
	-->

	<!-- Gasto, es igual a debit, pero fondo rosa, con otra opcioens de categoria:

	- Vacaciones, deudas, regalos, hogar, familia, salidas, alquiler, donaciones

	Tip de gasto fijo o variable, presuputesto: familiar, personal, negocio
	Fecha: hoy, ayer o seleccionar  


	Solo habilita el boton de siguiente cuando se selecciona una categoria

	pantalla volver a mis cuentas  o crear otro ingreso PERO esta es rosa -->
