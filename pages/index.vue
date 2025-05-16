<template>
  <main>
    <FeatureMyProfile></FeatureMyProfile>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  middleware: 'auth-middleware'
})
</script>