<template>
  <div>
    <SharedHeaderText>{{ t('yourOwnedDebts') }}</SharedHeaderText>
    <FeatureDebtsTape mode="owned" v-if="ownedDebtsTape.myOwnedDebts.length"></FeatureDebtsTape>
    <SharedEmptyImg v-else></SharedEmptyImg>
    <SharedToUpButton v-if="ownedDebtsTape.page >= ownedDebtsTape.totalPages && ownedDebtsTape.myOwnedDebts.length > 5"></SharedToUpButton>
  </div>
</template>

<script lang="ts" setup>
import { useOwnedDebtsTapeStore } from '~/features/debts-tape/model/my-owned-debts-tape.store'


const { t } = useI18n()

definePageMeta({
  middleware: ['auth-middleware']
})

const ownedDebtsTape = useOwnedDebtsTapeStore()
const windowScroll = useWindowScroll()
watch(windowScroll.y, () => {
  if (windowScroll.arrivedState.bottom && ownedDebtsTape.page < ownedDebtsTape.totalPages) {
    ownedDebtsTape.loadMyOwnedDebts()
  }
})

onMounted(ownedDebtsTape.loadMyOwnedDebts)
</script>

<style></style>