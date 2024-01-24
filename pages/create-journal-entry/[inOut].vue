<script setup>
import $ from 'jquery'
const route = useRoute()

onMounted(() => {
	getTemplates()
});

const rows = ref([]);
const errors = ref(null);

async function getTemplates() {
	const { data } = await useApiFetch(`/api/journalEntryTemplate/indexInOut/${route.params.inOut}`);
	rows.value = data.value;
}

async function store() {
	const formData = $('#form-create').serializeArray();
	const jsonData = {};

	formData.forEach((field) => {
		jsonData[field.name] = field.value;
	});

	try {
		const { data, error } = await useApiFetch('/api/journalEntry/store', {
			method: 'POST',
			body: JSON.stringify(jsonData)
		});
		if (error.value) {
			throw error;
		}
		return navigateTo('/')
	} catch (error) {
		errors.value = error.value?.data?.errors
	}

}
</script>

<template>
	<form method="POST" v-on:submit.prevent="store" id="form-create">
		<div class="tw-p-4"
			:class="{ 'tw-bg-red-400': route.params.inOut == 'out', 'tw-bg-green-400': route.params.inOut == 'in' }">
			<h3 class="tw-text-white tw-font-bold">NUEVO {{ route.params.inOut == 'out' ? 'GASTO' : 'INGRESO' }}</h3>
			<input type="number" class="form-control form-control-lg" name="amount" placeholder="Importe">
		</div>

		<div class="container">
			<div class="row">
				<div class="col-12 col-md-3 my-2">
					<label class="form-label">Categoría</label>
					<select class="form-control form-control-lg" id="category-select" name="journal_entry_template_id">
						<option v-for="row in rows" :value="row.id" :key="row.id">
							{{ row.name }}
						</option>
					</select>
				</div>

				<div class="col-12 col-md-3 my-2">
					<label class="form-label">Detalle del {{ route.params.inOut == 'out' ? 'Gasto' : 'Ingreso' }}</label>
					<input type="text" value="" class="form-control form-control-lg" name="observation">
				</div>

				<div class="col-12 col-md-3 my-2">
					<label class="form-label">Fecha</label>
					<input type="date" :value="$dayjs().format('YYYY-MM-DD')" class="form-control form-control-lg"
						name="posting_date">
				</div>

				<div class="col-12 col-md-3 text-center mt-4">
					<button type="submit" class="btn btn-lg"
						:class="{ 'btn-danger': route.params.inOut == 'out', 'btn-success': route.params.inOut == 'in' }">Submit</button>
				</div>

				<div v-if="errors" class="alert alert-danger" role="alert">
					<ul>
						<li v-for="error in errors">{{ error[0] }}</li>
					</ul>
				</div>
			</div>
		</div>
	</form>
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
