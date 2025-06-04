<template>
  <main class="w-full">
    <ClientOnly>
      <WidgetMyProfile></WidgetMyProfile>
    </ClientOnly>
    <div class="bg-red-50 h-20 rounded-full"></div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-middleware']
})
</script>