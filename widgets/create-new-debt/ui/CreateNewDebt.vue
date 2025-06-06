<template>
  <SharedStepNavigator :disable-next-button style="height: calc(100dvh - 100px);" @scroll-end="scrollEnd">
    <template #1>
      <FeatureCreateNewDebtTextForm class="mt-6" />
    </template>
    <template #2>
      <FeatureCreateNewDebtCurrency />
    </template>
    <template #3>
      <FeatureCreateNewDebtSelectDebtor />
    </template>
  </SharedStepNavigator>
</template>

<script lang="ts" setup>
import { useCreateNewDebtSelectDebtorStore } from '~/features/create-new-debt-select-debtor/model/create-new-debt-select-debtor.store'

const createNewDebtTextForm = useCreateNewDebtTextFormStore()
const createNewDebtCurrency = useCreateNewDebtCurrencyStore()
const createNewDebtSelectDebtor = useCreateNewDebtSelectDebtorStore()

const scrollEnd = (page: number) => {
  switch (page) {
    case 1: scrollEndCurrency();
    case 2: scrollEndDebtors();
  }
}

const scrollEndCurrency = () => {
  if (createNewDebtCurrency.page <= createNewDebtCurrency.totalPages) {
    createNewDebtCurrency.page++
    createNewDebtCurrency.fetchCurrencies()
  }
}

const scrollEndDebtors = () => {
  if (createNewDebtSelectDebtor.page <= createNewDebtSelectDebtor.totalPages) {
    createNewDebtSelectDebtor.page++
    createNewDebtSelectDebtor.fetchDebtors()
  }
}

const disableNextButton = computed(() => {
  return (page: number) => {
    return (!createNewDebtTextForm.title && page == 1) || (!createNewDebtCurrency.currencyId && page == 2)
  }
})
</script>
