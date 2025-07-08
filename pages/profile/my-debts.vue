<template>
  <div>
    <CommonHeaderText>{{ t('yourDebts') }}</CommonHeaderText>
    <FeatureDebtsTape mode="my" v-if="debtsTape.debts.length"></FeatureDebtsTape>
    <CommonEmptyImg v-else></CommonEmptyImg>
    <CommonToUpButton v-if="debtsTape.page >= debtsTape.totalPages && debtsTape.debts.length > 5"></CommonToUpButton>
  </div>
</template>

<script lang="ts" setup>

const { t } = useI18n()

definePageMeta({
  middleware: ['auth-middleware']
})

useHead({
  title: "My Debts"
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