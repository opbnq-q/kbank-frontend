<template>
  <div class="flex flex-col items-center h-full w-full">
    <div class="max-w-7xl w-full">
      <WidgetNav v-if="route.fullPath != '/auth'" class="fixed"></WidgetNav>
      <SharedErrorModal></SharedErrorModal>
      <SharedLoadingModal></SharedLoadingModal>
      <div class="mt-18 px-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const errorModal = useErrorModal()
errorModal.$subscribe((mutation, state) => {
  if (!state.show) state.message = '';
})
</script>

<style></style>