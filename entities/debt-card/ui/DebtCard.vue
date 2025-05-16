<template>
    <article
        class="w-full max-w-80 relative border-[1px] flex p-4 border-primary-border bg-secondary-bg rounded-2xl min-h-40">
        <div>
            <h1 class="text-xl">title</h1>
            <h2 class="">description</h2>
        </div>
        <Pie :data :options  class="max-h-22 relative left-6"></Pie>
        <h3 class="absolute bottom-3 ">debtor</h3>
        <h3 class="absolute bottom-3  right-4">status</h3>
    </article>
</template>

<script setup lang="ts">
import { ArcElement, Chart, Legend, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';

const props = defineProps<{
    price: number
    completed: number
}>()

Chart.register(ArcElement, Tooltip, Legend)

const data: ChartData<'pie'> = {
    labels: ['Completed', "Price"],
    datasets: [
        {
            data: [props.completed, props.price - props.completed],
            backgroundColor: ['#00E676', '#2979FF'],    
            borderWidth: 1,
            borderColor: 'transparent'
        }
    ],
}

const options: ChartOptions<'pie'> = {
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>