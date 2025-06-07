<template>
  <ClientOnly>
    <LazyEntityCompleteRequestCard v-for="cr in completeRequests" :complete-request="cr" :currency-title="debt.currency.title"
      :lender-id="debt.lender.id" :profile-id="profileId" :standard-units="debt.currency.standardUnits"
      @accept="() => {
        emits('accept', completeRequestsTape.debtIdCompleteRequestMap.get(debt.id)!.find(el => el.id == cr.id)!)
        completeRequestsTape.accept(debt.id, cr.id)
      }"
      @deny="() => {
        completeRequestsTape.deny(debt.id, cr.id)
      }"
      >
    </LazyEntityCompleteRequestCard>
  </ClientOnly>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "accept", request: CompleteRequest): void
}>()

const props = defineProps<{
  debt: Debt
  profileId: number
  mode: 'accepted' | 'denied' | 'other'
}>()

const completeRequestsTape = useCompleteRequestsTapeStore()
onMounted(() => completeRequestsTape.load(props.debt.id))
const completeRequests = computed(() => {
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