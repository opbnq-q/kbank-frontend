<template>
  <SharedStepNavigator style="height: calc(100dvh - 100px);" @scroll-end="scrollEnd">
    <template #1>
      <form class="flex flex-col gap-6 mt-4">
        <SharedBaseInput v-model="createNewDebt.title" placeholder="title"></SharedBaseInput>
        <SharedBaseInput v-model="createNewDebt.description" placeholder="description"></SharedBaseInput>
      </form>
    </template>
    <template #2>
      <SharedBaseInput v-model="search" @input="handleInput" placeholder="search" class="my-6"></SharedBaseInput>
      <p v-show="!currencies.length && !search">Начните поиск или создайте новую валюту</p>
      <SharedEmptyImg v-show="search && !currencies.length" message="not found" />
      <ul class="flex flex-col gap-4">
        <div v-for="currency in currencies" class="cursor-pointer" :class="{'p-[1px] bg-linear-to-br from-accent-green to-accent-blue rounded-xl': currency.id == createNewDebt.currencyId}">
          <EntityCurrencyCard @click="createNewDebt.currencyId = currency.id" :key="currency.id" :title="currency.title"
            :description="currency.description" :standard-units="currency.standardUnits">
          </EntityCurrencyCard>
        </div>
      </ul>
    </template>
  </SharedStepNavigator>
</template>

<script lang="ts" setup>
const createNewDebt = useCreateNewDebt()

const { $ofetch } = useNuxtApp()

const currencies = ref<Currency[]>([])

const page = ref(1)
const totalPages = ref(0)

const search = ref('')

const scrollEnd = () => {
  if (page.value <= totalPages.value) {
    page.value++
    fetchCurrencies()
  }
}

async function fetchCurrencies() {
  const result = await $ofetch<ServerResponseTemplate<{ data: Currency[], meta: { totalPages: number } }>>(`/currency?search=${search.value}&page=${page.value}`)
  if (result.status == 'success') {
    totalPages.value = result.data.meta.totalPages
    currencies.value = [...currencies.value, ...result.data.data].reduce((acc: Currency[], el: Currency) => {
      if (acc.find(i => i.id == el.id)) return acc;
      return [...acc, el]
    }, [] as Currency[])
  }
}

const handleInput = () => {
  page.value = 0;
  currencies.value = [];
  if (search.value) fetchCurrencies();
}

</script>
