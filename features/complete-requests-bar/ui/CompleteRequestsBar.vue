<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs';

const props = defineProps<{
  completeRequests: CompleteRequest[]
  standardUnits: number
}>()

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
}

const data: ComputedRef<ChartData<'bar'>> = computed(() => ({
  datasets: [{
    data: props.completeRequests.map(el => el.price * props.standardUnits),
    backgroundColor: '#00E676'
  }],
  labels: props.completeRequests.map(el => el.title)
}))
</script>

<template>
  <section>
    <Bar :data :options></Bar>
  </section>
</template>