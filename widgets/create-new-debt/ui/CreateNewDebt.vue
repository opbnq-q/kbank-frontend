<template>
  <SharedStepNavigator :disable-next-button style="height: calc(100dvh - 100px);" @scroll-end="scrollEnd">
    <template #1>
      <FeatureCreateNewDebtTextForm class="mt-6" />
    </template>
    <template #2>
      <FeatureCreateNewDebtCurrency />
    </template>
    <template #3>
      <FeatureCreateNewDebtSelectDebtor :profile-id />
    </template>
    <template #4>
      <div class="w-full items-center justify-between flex flex-col h-full">
        <SharedBaseInput :placeholder="t('createNewDebt.price')" v-model="createNewDebtCurrency.price" type="number"></SharedBaseInput>
        <SharedBaseButton class="w-full" @click="onSubmit">Submit</SharedBaseButton>
      </div>
    </template>
  </SharedStepNavigator>
</template>

<script lang="ts" setup>
const createNewDebtTextForm = useCreateNewDebtTextFormStore()
const createNewDebtCurrency = useCreateNewDebtCurrencyStore()
const createNewDebtSelectDebtor = useCreateNewDebtSelectDebtorStore()
const notifications = useNotificationsStore()

const { t } = useI18n()

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
    return (!createNewDebtTextForm.title && page == 1) || (!createNewDebtCurrency.currencyId && page == 2) || (!createNewDebtSelectDebtor.debtorId && page == 3)
  }
})

async function onSubmit() {
  const result = await createNewDebt({
    currencyId: createNewDebtCurrency.currencyId,
    debtorId: createNewDebtSelectDebtor.debtorId,
    title: createNewDebtTextForm.title,
    description: createNewDebtTextForm.description,
    price: createNewDebtCurrency.price
  })
  if (result.status == 'success') {
    notifications.summon({
      message: "You have created a new debt!",
      link: `/debts/${result.data.id}`
    })
    createNewDebtCurrency.$reset()
    createNewDebtSelectDebtor.$reset()
    createNewDebtTextForm.$reset()
    navigateTo(`/debts/${result.data.id}`)
  }
}

defineProps<{
  profileId: number
}>()
</script>
