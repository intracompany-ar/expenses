<script lang="ts" setup>

const { data, error } = await useApiFetch('/api/journalEntryTemplate/indexIncome');

</script>

<template>
  <form>
	  <!-- Sin Terminar <Calculator/> -->
		<div clas="bg-green-500">
			<input type="number">
		</div>

		<label>Categoría</label>
		<select>
			<option v-for="row in data">
				{{ row.name }}
			</option>

		</select>


		<label>Detalle</label>
		<input type="text" value="observation">

		<label>Fecha</label>
		<input type="date" value="observation">
	
		
		<button>Submit</button>
      <!-- 
        Prsupuesto: familiar, personal, negocio
        Fecha: hoy, ayer o seleccionar
         ->  -->
  </form>
</template>


<style>

</style>