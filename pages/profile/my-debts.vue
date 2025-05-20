<template>
  <div>
    <h1 class="text-center text-2xl">{{ t('yourDebts') }}</h1>
    <EntityDebtCard v-for="debt in profile.debts" :completed="debt.complete" :price="debt.price" :status="debt.status"
      :debtor-name="''" :description="debt.description" :title="debt.title"></EntityDebtCard>
  </div>
</template>

<script lang="ts" setup>

const { t } = useI18n()

definePageMeta({
  middleware: ['auth-middleware']
})

const profile = useMyProfile()
</script>

<style></style>