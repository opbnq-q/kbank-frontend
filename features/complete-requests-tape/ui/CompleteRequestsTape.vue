<template>
    <ClientOnly>
        <LazyEntityCompleteRequestCard v-for="cr in completeRequestsTape.acceptedCompleteRequests(debt.id)" :complete-request="cr"
          :currency-title="debt.currency.title" :lender-id="debt.lender.id" :profile-id="profileId"
          :standard-units="debt.currency.standardUnits">
        </LazyEntityCompleteRequestCard>
      </ClientOnly>
</template>

<script setup lang="ts">
import { useCompleteRequestsTapeStore } from '../model/complete-requests-tape.store';


const props = defineProps<{
    debt: Debt
    profileId: number
}>()

const completeRequestsTape = useCompleteRequestsTapeStore()
onMounted(() => completeRequestsTape.load(props.debt.id))
</script>