<template>
  <main class="w-full">
    <ClientOnly>
      <WidgetProfile></WidgetProfile>
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-middleware']
})
</script>