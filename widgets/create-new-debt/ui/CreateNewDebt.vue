<template>
  <SharedStepNavigator style="height: calc(100dvh - 100px);" @scroll-end="scrollEndCurrency">
    <template #1>
      <FeatureCreateNewDebtTextForm class="mt-6" />
    </template>
    <template #2>
      <FeatureCreateNewDebtCurrency></FeatureCreateNewDebtCurrency>
    </template>
  </SharedStepNavigator>
</template>

<script lang="ts" setup>
import { useCreateNewDebtCurrencyStore } from '~/features/create-new-debt-currency/model/create-new-debt-currency.store'

const createNewDebtCurrency = useCreateNewDebtCurrencyStore()

const scrollEndCurrency = () => {
  if (createNewDebtCurrency.page <= createNewDebtCurrency.totalPages) {
    createNewDebtCurrency.page++
    createNewDebtCurrency.fetchCurrencies()
  }
}
</script>
