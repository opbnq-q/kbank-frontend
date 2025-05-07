<template>
  <div class="flex gap-5 m-5 flex-col">
    <SharedBaseModal header="kuzbass" v-model:show="show">
    </SharedBaseModal>
    <SharedBaseButton @click="show = !show">change</SharedBaseButton>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)
</script>