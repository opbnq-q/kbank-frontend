<template>
  <SharedBaseModal v-model:show="errorModal.show" :header="t('error.header')">
    <p>{{ errorModal.message }}</p>
  </SharedBaseModal>
</template>

<script lang="ts" setup>
const errorModal = useErrorModal()
const { t } = useI18n()
</script>

<style>

</style>