<template>
  <div v-if="debt && debt.currency">
    <div :class="{ 'grid grid-cols-2 gap-4': acceptedCompletedRequests }" class="max-lg:flex max-lg:flex-col">
      <section>
        <SharedHeaderText class="text-start flex gap-2 items-center">{{ debt.title }}
          <SharedViewedStatus :tooltip="debt.status" class="text-[1rem] relative top-0.5" :status="debt.status"></SharedViewedStatus>
        </SharedHeaderText>
        <h2 class="wrap-break-word text-lg font-semibold">{{ debt.price }} {{ debt.currency.title }}</h2>
        <h2 class="mb-8 wrap-break-word text-md opacity-80">{{ debt.description }}</h2>
      </section>
      <FeatureCompleteRequestsBar :standard-units="debt.currency.standardUnits"
        :complete-requests="<[]>completeRequestsTape.acceptedCompleteRequests(debt.id)"
        class="flex w-full justify-center lg:justify-end max-lg:mb-4"
        v-if="debt.status == DebtStatus.ACCEPTED && acceptedCompletedRequests"></FeatureCompleteRequestsBar>
    </div>
    <SharedProgressBar class="w-full" :complete="debt.complete * debt.currency.standardUnits"
      :price="debt.price * debt.currency.standardUnits"></SharedProgressBar>
    <SharedBaseButton v-if="debt.status == DebtStatus.ACCEPTED"
      @click="navigateTo(`/complete-requests/new?debtId=${debt.id}`)" class="w-full mt-2">{{ t('repayTheDebt') }}
    </SharedBaseButton>
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
    <FeatureDebtsChart v-if="debt.status == DebtStatus.ACCEPTED && acceptedCompletedRequests" :debt="debt"
      :complete-requests-tape="completeRequestsTape" class="mt-4" />
    <FeatureDebtAcceptMenu v-model="debt"
      v-if="(debt.status == DebtStatus.IGNORED || debt.status == DebtStatus.NOT_VIEWED) && profile.id == debt.debtor.id">
    </FeatureDebtAcceptMenu>
    <section class="mt-8 flex flex-col gap-2" v-else-if="debt.status === DebtStatus.ACCEPTED">
      <h4 class="text-sm">{{ t('new') }}</h4>
      <FeatureCompleteRequestsTape @accept="updateProgressBar" mode="other" v-if="notViewedAndIgnoredRequests" :debt
        :profile-id="profile.id"></FeatureCompleteRequestsTape>
      <SharedEmptyImg v-else />
      <h4 class="text-sm">{{ t('accepted') }}</h4>
      <FeatureCompleteRequestsTape mode="accepted" v-if="acceptedCompletedRequests" :debt :profile-id="profile.id">
      </FeatureCompleteRequestsTape>
      <SharedEmptyImg v-else />
      <h4 class="text-sm">{{ t('denied') }}</h4>
      <FeatureCompleteRequestsTape mode="denied" v-if="deniedCompleteRequests" :debt :profile-id="profile.id">
      </FeatureCompleteRequestsTape>
      <SharedEmptyImg v-else />
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth-middleware']
})

const updateProgressBar = (request: CompleteRequest) => {
  if (!debt.value) return;
  debt.value.complete += request.price
  debt.value.isCompleted = debt.value.price >= debt.value.complete
}

const profile = useProfileStore()
const completeRequestsTape = useCompleteRequestsTapeStore()

const { t } = useI18n()

const debt = ref<null | Debt>(null)

const route = useRoute()
const { $ofetch } = useNuxtApp()
const id = parseInt(route.params.id as string)

onMounted(async () => {
  await profile.load()
  const result = await $ofetch<ServerResponseTemplate<Debt>>(`/debts/${id}`)
  if (result.status == 'success') {
    debt.value = result.data
    completeRequestsTape.addCompleteRequests(debt.value.id, debt.value.completeRequests)
  }
})

const acceptedCompletedRequests = computed(() => debt.value && completeRequestsTape.acceptedCompleteRequests(debt.value.id)?.length)
const deniedCompleteRequests = computed(() => debt.value && completeRequestsTape.deniedCompleteRequests(debt.value.id)?.length)
const notViewedAndIgnoredRequests = computed(() => debt.value && completeRequestsTape.ignoredAndNotViewedRequests(debt.value.id)?.length)
</script>