<template>
  <div class="m-5 flex">
    <EntityInfoCard></EntityInfoCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-middleware',
})
</script>