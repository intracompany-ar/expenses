<script setup>
import AirDatepicker from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import 'air-datepicker/air-datepicker.css';
import {useMonthYearStore} from '~/stores/useMonthYearStore'
const storeMonthYear = useMonthYearStore();

const emit = defineEmits()

onMounted(() => {
    new AirDatepicker('#monthyear', {
        locale: localeEs,
        view: 'months',
        minView: 'months',
        isMobile: true,
        dateFormat: 'MM yyyy',
        autoClose: true,

        onSelect({date, formattedDate, datepicker}){
            
			const [mes, anio] = formattedDate.split(' ').map(Number);

            storeMonthYear.month = mes;
            storeMonthYear.year = anio;

			emit('selected')
        }
    })
})
</script>

<template>
	<div class="row tw-py-3 tw-bg-indigo-200">
		<div class="offset-3 col-6 text-center">
			<input type="text" id="monthyear" name="monthyear" class="text-center form-control form-control-lg" :value="storeMonthYear.month+'/'+storeMonthYear.year"/>
		</div>
	</div>
</template>