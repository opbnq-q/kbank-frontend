<template>
  <Line :data="data" :options="options" />
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'

const props = defineProps<{
  debt: Debt
  completeRequestsTape: ReturnType<typeof useCompleteRequestsTapeStore>
}>()

const data = computed<ChartData<'line'>>(() => ({
  labels: props.completeRequestsTape.acceptedCompleteRequests(props.debt.id)?.map(el => el.title) ?? [],
  datasets: [{
    data: props.completeRequestsTape.acceptedCompleteRequests(props.debt.id)?.map(el => el.price * props.debt.currency.standardUnits) ?? [],
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