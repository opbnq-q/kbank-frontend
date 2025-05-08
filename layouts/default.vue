<template>
  <div>
    <SharedErrorModal></SharedErrorModal>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const errorModal = useErrorModal()
errorModal.$subscribe((mutation, state) => {
  if (!state.show) state.message = '';
})
</script>

<style></style>