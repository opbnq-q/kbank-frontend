<template>
  <div>
    <h1 class="text-center text-2xl">{{ t('yourDebts') }}</h1>
    <EntityDebtCard :completed="50" :price="100"></EntityDebtCard>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
  middleware: ['auth-middleware']
})
</script>

<style>

</style>