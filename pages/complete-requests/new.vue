<template>
  <div style="height: calc(100dvh - 100px);">
    <SharedStepNavigator>
      <template #1>
        <div class="flex flex-col justify-between h-full">
          <EntityDebtCard w-full class="w-full" v-if="debt" :title="debt.title"
            :complete="debt.complete * debt.currency.standardUnits" :description="debt.description" :id="debt.id"
            :name="`${debt.lender.firstName} ${debt.lender.lastName}`" :price="debt.price * debt.currency.standardUnits"
            :status="debt.status"></EntityDebtCard>
          <div class="flex flex-col gap-6">
            <SharedBaseInput v-model="title" :placeholder="'Title'"></SharedBaseInput>
            <SharedBaseInput v-model="description" :placeholder="'Description'"></SharedBaseInput>
            <SharedBaseInput v-model="price" :placeholder="'Price'" type="number"></SharedBaseInput>
          </div>
        </div>
      </template>
      <template #2>
        <div class="w-full h-full flex flex-col justify-end">
          <SharedBaseButton @click="onSubmit">Submit</SharedBaseButton>
        </div>
      </template>
    </SharedStepNavigator>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth-middleware']
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
const price = ref(0)

const onSubmit = async () => {
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