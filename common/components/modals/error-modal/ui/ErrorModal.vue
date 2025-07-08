<template>
  <CommonBaseModal class="z-50" v-model:show="errorModal.show" :header="t('error.header')">
    <p>{{ errorModal.message }}</p>
  </CommonBaseModal>
</template>

<script lang="ts" setup>
const errorModal = useErrorModalStore()
const { t } = useI18n()
</script>

<style>

</style>