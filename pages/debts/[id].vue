<template>
  <div v-if="debt">
    <div :class="{ 'grid grid-cols-2 gap-4': acceptedCompletedRequests?.length }" class="max-lg:flex max-lg:flex-col">
      <section>
        <SharedHeaderText class="text-start">{{ debt.title }}</SharedHeaderText>
        <h2 class="wrap-break-word text-lg font-semibold">{{ debt.price }} {{ debt.currency.title }}</h2>
        <h2 class="mb-8 wrap-break-word text-md opacity-80">{{ debt.description }}</h2>
      </section>
      <section class="flex justify-center lg:justify-end max-lg:mb-4"
        v-if="debt.status == DebtStatus.ACCEPTED && acceptedCompletedRequests?.length">
        <Bar :data :options class="w-full"></Bar>
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
    <section v-if="debt.status == DebtStatus.IGNORED || debt.status == DebtStatus.NOT_VIEWED"
      class="w-full grid grid-cols-2 gap-4 mt-8">
      <button @click="async () => {
        const result = await $ofetch<ServerResponseTemplate>(`/debts/deny/${id}`, {
          method: 'PATCH'
        })
        if (result.status == 'success') {
          debt!.status = DebtStatus.DENIED
          debtsTape.changeStatusById(debt!.id, DebtStatus.DENIED)
        }
      }"
        class="bg-[var(--accent-light-red)] p-4 hover:opacity-90 rounded-xl text-primary-bg cursor-pointer transition active:scale-90">Deny</button>
      <button @click="async () => {
        const result = await $ofetch<ServerResponseTemplate>(`/debts/accept/${id}`, {
          method: 'PATCH'
        })
        if (result.status == 'success') {
          debt!.status = DebtStatus.ACCEPTED
          debtsTape.changeStatusById(debt!.id, DebtStatus.ACCEPTED)
          const result = await $ofetch<ServerResponseTemplate<Debt>>(`/debts/${id}`)
          if (result.status == 'success') {
            debt = result.data
          }
        }
      }"
        class="bg-[var(--accent-light-green)] hover:opacity-90 p-4 rounded-xl text-primary-bg cursor-pointer transition active:scale-90">Accept</button>
    </section>
    <section class="mt-8 flex flex-col gap-2" v-else-if="debt.status === DebtStatus.ACCEPTED">
      <h4 class="text-sm">{{ t('history') }}</h4>
      <FeatureCompleteRequestsTape :debt :profile-id="profile.id"></FeatureCompleteRequestsTape>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Chart, registerables, type ChartData, type ChartOptions } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useCompleteRequestsTapeStore } from '~/features/complete-requests-tape/model/complete-requests-tape.store'

definePageMeta({
  middleware: ['auth-middleware']
})

const debtsTape = useDebtsTapeStore()
const profile = useMyProfile()
const completeRequestsTape = useCompleteRequestsTapeStore()

const { t } = useI18n()

const debt = ref<null | Debt>(null)

const route = useRoute()
const { $ofetch } = useNuxtApp()
const id = parseInt(route.params.id as string)

Chart.register(...registerables)

onMounted(async () => {
  profile.load()
  const result = await $ofetch<ServerResponseTemplate<Debt>>(`/debts/${id}`)
  if (result.status == 'success') {
    debt.value = result.data
  }
})

const acceptedCompletedRequests = computed(() => debt.value ? completeRequestsTape.acceptedCompleteRequests(debt.value.id) : [])

const data: ComputedRef<ChartData<'bar'>> = computed(() => (acceptedCompletedRequests.value ? {
  datasets: [{
    data: acceptedCompletedRequests.value.map(el => el.price * (debt.value as Debt).currency.standardUnits),
    backgroundColor: '#00E676'
  }],
  labels: acceptedCompletedRequests.value.map(el => el.title)
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