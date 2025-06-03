<template>
  <main class="w-full">
    <ClientOnly>
      <WidgetMyProfile></WidgetMyProfile>
    </ClientOnly>
    <Line :data="data" :options="options" />
  </main>
</template>

<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'vue-chartjs';

definePageMeta({
  middleware: 'auth-middleware'
})

const data: ChartData<'line'> = {
  labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
  datasets: [
    {
      label: 'Доход',
      data: [12000, 15000, 14000, 17000, 16000, 18000],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    }
  ]
}

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true
    }
  }
}
</script>