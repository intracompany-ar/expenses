<script setup>
import $ from 'jquery'
import { format } from 'date-fns'

const route = useRoute()

const date = ref(new Date())
const rows = ref([]);
const errors = ref(null);

onMounted(() => {
	getTemplates()
});


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
		return navigateTo({ path: '/', query: { message: 'Asiento insertado con éxito!' } })
	} catch (error) {
		errors.value = error.value?.data?.errors
	}

}
</script>

<template>
	<form method="POST" v-on:submit.prevent="store" id="form-create" class="bg-gray-300">


		<div class="p-4"
			:class="{ 'flex items-center justify-center': true, 'bg-red-400': route.params.inOut == 'out', 'bg-green-400': route.params.inOut == 'in' }">
			<div>
				<h3 class="text-white font-bold">NUEVO {{ route.params.inOut == 'out' ? 'GASTO' : 'INGRESO' }}</h3>
				<UInput name="amount" type="number" placeholder="Importe" size="xl" />
			</div>
		</div>

		<div class="container mx-auto p-4 ">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
				<div class="my-2">
					<UFormGroup label="Cuenta">
						<USelect :options="rows" id="category-select" name="journal_entry_template_id"
							option-attribute="name" value-attribute="id" />
					</UFormGroup>
				</div>

				<div class="my-2">
					<UFormGroup label="En concepto de">
						<UInput Name="observation" />
					</UFormGroup>
				</div>

				<div class="my-2 flex items-center justify-center">
					<UFormGroup label="Fecha Contable">
						<UPopover :popper="{ placement: 'bottom-start' }">
							<input type="hidden" name="posting_date" :value="format(date, 'yyyy-MM-dd')" />
							<UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />
							<template #panel="{ close }">
								<DatePicker v-model="date" @close="close" name="posting_date" />
							</template>
						</UPopover>
					</UFormGroup>
				</div>

				<div class="text-center mt-4  md:col-span-3">
					<UButton type="submit" :color="route.params.inOut == 'out' ? 'red' : 'green'"
						:ui="{ rounded: 'rounded-full' }" size="xl">INSERTAR</UButton>
				</div>

				<div v-if="errors" class="alert alert-danger  col-span-3" role="alert">
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
