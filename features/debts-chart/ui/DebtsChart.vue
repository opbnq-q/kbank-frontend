<template>
    <Line :data="data" :options="options" />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
    debt: Debt
}>()

const completeRequestsTape = useCompleteRequestsTapeStore()

const prices = computed(() =>
    completeRequestsTape.acceptedCompleteRequests(props.debt.id)?.map(
        el => el.price * props.debt.currency.standardUnits
    ) ?? []
)

const prefixSums = computed(() => {
    const arr = prices.value
    let sum = 0
    return arr.map(v => sum += v)
})

const data = computed<ChartData<'line'>>(() => ({
    labels: completeRequestsTape.acceptedCompleteRequests(props.debt.id)?.map(el => el.title) ?? [],
    datasets: [{
        data: prefixSums.value,
        borderColor: '#2979FF',
        backgroundColor: '#2979FF20',
        fill: true,
    }]
}))

const options: ChartOptions<'line'> = {
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>