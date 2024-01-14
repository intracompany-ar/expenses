<script setup>
import $ from 'jquery'

const {data: rows} =  await useApiFetch('/journalEntryTemplate/indexIncome');

async function store() {
	const formData = $('#form-create').serializeArray();
	const jsonData = {};

	formData.forEach((field) => {
		jsonData[field.name] = field.value;
	});

	await useApiFetch('/api/journalEntry/store', {
		method: 'POST',
		body: JSON.stringify(jsonData)
	});

	return navigateTo('/')
}
</script>


<template>
	<form method="POST" v-on:submit.prevent="store" id="form-create">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-3">
					<label class="form-label">Importe</label>
					<input type="number" class="form-control form-control-lg" name="amount">
				</div>


				<div class="col-12 col-md-3 my-2">
					<label class="form-label">Categoría</label>
					<select class="form-control form-control-lg" id="category-select" name="journal_entry_template_id">
						<option v-for="row in rows" :value="row.id" :key="row.id">
							{{ row.name }}
						</option>
					</select>
				</div>

				<div class="col-12 col-md-3 my-2">
					<label  class="form-label">Detalle</label>
					<input type="text" value="" class="form-control form-control-lg" name="observation">
				</div>

				<div class="col-12 col-md-3 my-2">
					<label class="form-label">Fecha</label>
					<input type="date" :value="$dayjs().format('YYYY-MM-DD')" class="form-control form-control-lg" name="posting_date">
				</div>

				<div class="col-12 col-md-3 text-center mt-4">
					<button type="submit" class="btn btn-primary btn-lg">Submit</button>
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