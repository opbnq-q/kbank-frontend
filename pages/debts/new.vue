<template>
  <WidgetCreateNewCurrency class="z-50"></WidgetCreateNewCurrency>
  <WidgetCreateNewDebt @create-new-currency="createNewCurrency.summon" :profile-id="profile.id" />
</template>

<script setup lang="ts">
const profile = useProfileStore()
profile.load()

const createNewCurrency = useCreateNewCurrencyStore()
</script>