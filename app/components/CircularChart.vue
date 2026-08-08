<script setup>
import { Doughnut } from 'vue-chartjs';

const chartData = ref({
    labels: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4'],
    datasets: [{
        data: [20, 30, 40, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
    }],
})

const chartOptions = ref({
    cutoutPercentage: 70,
    responsive: false,
})

onMounted(() => {
    new Doughnut(chartData.value, chartOptions.value);
});
</script>

<template>
    <div>
        <doughnut-chart :data="chartData" :options="chartOptions"></doughnut-chart>
    </div>
</template>