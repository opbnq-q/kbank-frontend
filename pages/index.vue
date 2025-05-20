<template>
  <main>
    <ClientOnly>
      <FeatureMyProfile></FeatureMyProfile>
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth-middleware' 
})
</script>