<template>
  <SharedBaseModal hide-close-button class="z-50" v-model:show="loadingModal.show" :header="t('loading.header')">
    <div class="w-20 h-12 flex items-center justify-center">
      <Icon name="hugeicons:loading-03" class="animate-spin" size="32px"></Icon>
    </div>
  </SharedBaseModal>
</template>

<script lang="ts" setup>
const loadingModal = useLoadingModal()
const { t } = useI18n()
</script>

<style>

</style>