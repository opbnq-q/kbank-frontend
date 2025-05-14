<template>
  <div>
    <FeatureMyProfile></FeatureMyProfile>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-middleware'
})
</script>