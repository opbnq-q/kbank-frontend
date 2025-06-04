<template>
  <main class="w-full">
    <ClientOnly>
      <WidgetMyProfile></WidgetMyProfile>
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-middleware']
})
</script>