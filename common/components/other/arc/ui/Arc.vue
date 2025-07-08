<template>
    <Pie class="max-h-22" :data :options></Pie>
</template>

<script setup lang="ts">
import { type ChartData, type ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';

const props = defineProps<{
    complete: number
    price: number
}>()

const data: ChartData<'pie'> = {
    labels: ['Completed', "Price"],
    datasets: [
        {
            data: [props.complete, props.price - props.complete],
            backgroundColor: ['#00E676', '#2979FF'],
            borderWidth: 1,
            borderColor: 'transparent'
        }
    ],
}

const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>