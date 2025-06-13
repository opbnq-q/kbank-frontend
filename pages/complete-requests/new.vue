<template>
  <div style="height: calc(100dvh - 100px);">
    <SharedStepNavigator :disable-next-button>
      <template #1>
        <div class="flex flex-col justify-between h-full">
          <EntityDebtCard w-full class="w-full" v-if="debt" :title="debt.title"
            :complete="debt.complete * debt.currency.standardUnits" :description="debt.description" :id="debt.id"
            :name="`${debt.lender.firstName} ${debt.lender.lastName}`" :price="debt.price * debt.currency.standardUnits"
            :status="debt.status"></EntityDebtCard>
          <div class="flex flex-col gap-6">
            <SharedBaseInput v-model="title" :placeholder="t('createNewCompleteRequest.title') + '*'"></SharedBaseInput>
            <SharedBaseInput v-model="description" :placeholder="t('createNewCompleteRequest.description') + '*'">
            </SharedBaseInput>
          </div>
        </div>
      </template>
      <template #2>
        <div class="w-full h-full flex flex-col justify-between" v-if="debt">
          <div class="flex flex-col gap-4">
            <SharedInfoCard>
              <h1>{{ debt.price - debt.complete }} {{ debt.currency.title }} - {{ price }} {{ debt.currency.title }} =
                {{ debt.price - price - debt.complete }} {{ debt.currency.title }}</h1>
            </SharedInfoCard>
            <EntityCurrencyCalc :currency="debt.currency" v-model="price"></EntityCurrencyCalc>
          </div>
          <div class="w-full flex flex-col gap-6 justify-end">
            <SharedBaseInput :model-value="price" @input="(e: InputEvent) => {
              const value = parseInt((e.target as HTMLInputElement).value ?? '0')
              if (value > 0) price = value
            }" :placeholder="t('createNewCompleteRequest.price') + '*'" type="number"></SharedBaseInput>
            <SharedBaseButton large @click="onSubmit">{{ t('createNewCompleteRequest.submit') }}</SharedBaseButton>
          </div>
        </div>
      </template>
    </SharedStepNavigator>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth-middleware']
})

const { t } = useI18n()

const disableNextButton = computed(() => {
  return (page: number) => (
    page == 1 && (title.value.length < 1 || title.value.length > 40 || description.value.length < 1 || description.value.length > 200) || page == 2
  )
})

const route = useRoute()
const router = useRouter()
const { $ofetch } = useNuxtApp()

if (!route.query.debtId) router.back();
const debtId = parseInt(route.query.debtId as string)

const debt = ref<Debt | null>(null)
onMounted(() => {
  $ofetch<ServerResponseTemplate<Debt>>(`/debts/${debtId}`).then(res => {
    if (res.status == 'success') {
      debt.value = res.data
    }
  })
})

const title = ref('')
const description = ref('')
const price = ref(1)

const onSubmit = async () => {
  if (price.value < 0) {
    return
  }
  const result = await $ofetch<ServerResponseTemplate>(`/complete-requests`, {
    method: "POST",
    body: {
      debtId,
      price: price.value,
      title: title.value,
      description: description.value
    }
  })
  if (result.status == 'success') {
    navigateTo(`/debts/${debtId}`)
  }
}
</script>

<style></style>