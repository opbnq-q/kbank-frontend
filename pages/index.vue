<template>
  <main class="w-full">
    <ClientOnly>
      <WidgetProfile></WidgetProfile>
      <div class="flex items-center justify-end w-full mt-6">
        <SharedBaseButton square large @click="navigateTo('/debts/new')">
          <Icon name="carbon:add" size="1.3rem" />
        </SharedBaseButton>
      </div>
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth-middleware']
})
</script>