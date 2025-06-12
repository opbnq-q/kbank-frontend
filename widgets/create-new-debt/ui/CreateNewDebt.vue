<template>
  <SharedStepNavigator :disable-next-button style="height: calc(100dvh - 100px);" @scroll-end="scrollEnd">
    <template #1>
      <FeatureCreateNewDebtTextForm />
    </template>
    <template #2>
      <FeatureCreateNewDebtCurrency @create-new-currency="emits('createNewCurrency')" />
    </template>
    <template #3>
      <FeatureCreateNewDebtSelectDebtor :profile-id />
    </template>
    <template #4>
      <div class="w-full h-full flex flex-col justify-between">
        <SharedInfoCard v-if="createNewDebtSelectDebtor.debtor && createNewDebtCurrency.currency">
          <div class="flex flex-col gap-1">
            <h1>{{ t('createNewDebt.title') }}: {{ createNewDebtTextForm.title }}</h1>
            <h1 v-if="createNewDebtTextForm.description">{{ t('createNewDebt.description') }}: {{ createNewDebtTextForm.description }}</h1>
            <h1>{{ t('createNewDebt.debtor') }}: {{ createNewDebtSelectDebtor.debtor.firstName }} {{ createNewDebtSelectDebtor.debtor.lastName }}</h1>
            <h1>{{ t('createNewDebt.price') }}: {{ createNewDebtCurrency.price }} {{ createNewDebtCurrency.currency.title }} = {{ createNewDebtCurrency.price * createNewDebtCurrency.currency.standardUnits }} {{ t('standardUnit') }}</h1>
          </div>
        </SharedInfoCard>
        <div class="justify-end gap-4 flex flex-col ">
          <SharedBaseInput class="w-full" :error :placeholder="t('createNewDebt.price')"
            v-model="createNewDebtCurrency.price" type="number"></SharedBaseInput>
          <SharedBaseButton large class="w-full" @click="create">{{ t('createNewDebt.submit') }}</SharedBaseButton>
        </div>
      </div>
    </template>
  </SharedStepNavigator>
</template>

<script lang="ts" setup>
const createNewDebtTextForm = useCreateNewDebtTextFormStore()
const createNewDebtCurrency = useCreateNewDebtCurrencyStore()
const createNewDebtSelectDebtor = useCreateNewDebtSelectDebtorStore()
const notifications = useNotificationsStore()
const emits = defineEmits<{
  (e: 'createNewCurrency'): void
}>()

const error = ref('')
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
    return (
      ((createNewDebtTextForm.title.length < 1 || createNewDebtTextForm.title.length > 500 || (createNewDebtTextForm.description ?? '').length > 500) && page == 1) ||
      (!createNewDebtCurrency.currency?.id && page == 2) ||
      (!createNewDebtSelectDebtor.debtor?.id && page == 3) ||
      (page == 4)
    )
  }
})

async function create() {
  if (createNewDebtCurrency.price <= 0) {
    error.value = t('createNewDebt.error')
    return
  }
  const result = await createNewDebt({
    currencyId: createNewDebtCurrency.currency!.id,
    debtorId: createNewDebtSelectDebtor.debtor!.id,
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
