<template>
  <div v-if="debt">
    <div :class="{ 'grid grid-cols-2 gap-4': completeRequests?.length }" class="max-lg:flex max-lg:flex-col">
      <section>
        <SharedHeaderText class="text-start">{{ debt?.title }}</SharedHeaderText>
        <h2 class="mb-10 wrap-break-word text-lg">{{ debt?.description }}</h2>
      </section>
      <section class="flex justify-center lg:justify-end">
        <Bar v-if="completeRequests?.length" :data :options class="w-full"></Bar>
      </section>
    </div>
    <SharedProgressBar class="w-full" :complete="debt.complete * debt.currency.standardUnits"
      :price="debt.price * debt.currency.standardUnits"></SharedProgressBar>
    <section class="grid grid-cols-2 w-full gap-y-2 gap-x-4 text-sm my-4">
      <h1>{{ t('debtor') }}</h1>
      <h1>{{ t('lender') }}</h1>
      <EntityUserCard :name="`${debt.debtor.firstName} ${debt.debtor.lastName}`" :id="debt.debtor.id"
        :balance="debt.debtor.balance"></EntityUserCard>
      <EntityUserCard :name="`${debt.lender.firstName} ${debt.lender.lastName}`" :id="debt.lender.id"
        :balance="debt.lender.balance"></EntityUserCard>
    </section>
    <EntityCurrencyCard :title="debt.currency.title" :description="debt.currency.description"
      :standard-units="debt.currency.standardUnits"></EntityCurrencyCard>
    
  </div>
</template>

<script lang="ts" setup>
import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { CompleteRequestStatus } from '~/shared/types/complete-request-status.type'
import type { CompleteRequest } from '~/shared/types/complete-request.type'

const { t } = useI18n()

const debt = ref<null | Debt>(null)

const route = useRoute()
const { $ofetch } = useNuxtApp()
const errorModal = useErrorModal()
const id = parseInt(route.params.id as string)

Chart.register(...registerables)

onMounted(async () => {
  try {
    const result = await $ofetch<ServerResponseTemplate<Debt>>(`/debts/${id}`)
    if (result.status == 'success') {
      debt.value = result.data
    }
  } catch (e) {
    errorModal.summon((e as any).statusCode)
  }
})

const completeRequests: ComputedRef<CompleteRequest[] | undefined> = computed(() => {
  if (debt.value) return debt.value.completeRequests.filter(el => el.status != CompleteRequestStatus.NOT_VIEWED);
})


const data: ComputedRef<ChartData<'bar'>> = computed(() => (completeRequests.value ? {
  datasets: [{
    data: completeRequests.value.map(el => el.price * (debt.value as Debt).currency.standardUnits),
    backgroundColor: '#00E676'
  }],
  labels: completeRequests.value.map(el => el.title)
} : {
  datasets: []
}))

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
}
</script>

<style scoped></style>