<template>
    <article
        class="w-full max-w-80 relative border-[1px] max-sm:flex-col flex p-4 max-sm:pb-10 max-sm:gap-4 border-primary-border bg-secondary-bg rounded-2xl min-h-40">
        <div class="sm:absolute">
            <h1 class="text-xl">{{ title }}</h1>
            <h1>{{ price }} {{ t('standardUnit') }}</h1>
            <h2 class="">{{ description }}</h2>
        </div>
        <Pie :data :options class="max-h-22 sm:absolute sm:-right-22"></Pie>
        <h3 class="absolute bottom-3">{{ debtorName }}</h3>
        <SharedViewedStatus :tooltip="status.toLocaleLowerCase()" :status></SharedViewedStatus>
    </article>
</template>

<script setup lang="ts">
import { ArcElement, Chart, Legend, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';

const { t } = useI18n()

const props = defineProps<{
    title: string
    description: string
    price: number
    completed: number
    debtorName: string
    status: DebtStatus
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
        },

    }
}
</script>