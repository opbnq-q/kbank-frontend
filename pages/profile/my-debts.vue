<template>
  <div>
    <SharedHeaderText>{{ t('yourDebts') }}</SharedHeaderText>
    <FeatureDebtsTape mode="my" v-if="debtsTape.debts.length"></FeatureDebtsTape>
    <SharedEmptyImg v-else></SharedEmptyImg>
    <SharedToUpButton v-if="debtsTape.page >= debtsTape.totalPages && debtsTape.debts.length > 5"></SharedToUpButton>
  </div>
</template>

<script lang="ts" setup>

const { t } = useI18n()

definePageMeta({
  middleware: ['auth-middleware']
})

const debtsTape = useDebtsTapeStore()
const windowScroll = useWindowScroll()
watch(windowScroll.y, () => {
  if (windowScroll.arrivedState.bottom && debtsTape.page < debtsTape.totalPages) {
    debtsTape.loadMyDebts()
  }

})

onMounted(debtsTape.loadMyDebts)
</script>

<style></style>