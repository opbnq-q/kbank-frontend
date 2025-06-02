<template>
  <ClientOnly>
    <LazyEntityCompleteRequestCard v-for="cr in debts" :complete-request="cr" :currency-title="debt.currency.title"
      :lender-id="debt.lender.id" :profile-id="profileId" :standard-units="debt.currency.standardUnits"
      @accept="completeRequestsTape.accept(debt.id, cr.id)"
      @deny="completeRequestsTape.deny(debt.id, cr.id)"
      >
    </LazyEntityCompleteRequestCard>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useCompleteRequestsTapeStore } from '../model/complete-requests-tape.store';


const props = defineProps<{
  debt: Debt
  profileId: number
  mode: 'accepted' | 'denied' | 'other'
}>()

const completeRequestsTape = useCompleteRequestsTapeStore()
onMounted(() => completeRequestsTape.load(props.debt.id))
const debts = computed(() => {
  switch (props.mode) {
    case 'accepted':
      return completeRequestsTape.acceptedCompleteRequests(props.debt.id)
    case 'denied':
      return completeRequestsTape.deniedCompleteRequests(props.debt.id)
    case 'other':
      return completeRequestsTape.ignoredAndNotViewedRequests(props.debt.id)
  }
})
</script>