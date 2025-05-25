<template>
    <article
        class="w-full overflow-hidden max-w-80 relative border-[1px] max-sm:flex-col flex p-4 max-sm:pb-10 max-sm:gap-4 border-primary-border bg-secondary-bg rounded-2xl min-h-40">
        <div class="sm:absolute">
            <h1 class="text-xl">{{ title }}</h1>
            <h1>{{ complete }} / {{ price }} {{ t('standardUnit') }}</h1>
            <h2 class="">{{ description }}</h2>
        </div>
        <Pie :data :options class="max-h-22 sm:absolute sm:-right-22"></Pie>
        <h3 class="absolute bottom-3">{{ name }}</h3>
        <SharedViewedStatus :status></SharedViewedStatus>
    </article>
</template>

<script setup lang="ts">
import { ArcElement, Chart, Legend, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Pie } from 'vue-chartjs';

const { t } = useI18n()

const props = defineProps<{
    title: string
    description?: string
    price: number
    complete: number
    name: string
    status: DebtStatus
}>()

Chart.register(ArcElement, Tooltip, Legend)

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
    plugins: {
        legend: {
            display: false
        },

    }
}
</script>