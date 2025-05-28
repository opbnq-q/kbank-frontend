<template>
  <div class="flex flex-col items-center h-full w-full px-5">
    <div class="max-w-7xl w-full">
      <WidgetNav v-if="!isAuthRoute" class="sticky z-50" />
      <SharedErrorModal />
      <SharedLoadingModal />
      <div class="">
        <slot />
      </div>
      <div class="fixed bottom-5 right-5">
        <FeatureNotifications></FeatureNotifications>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { locale } = useI18n()

const isAuthRoute = computed(() => {
  if (route.path === '/auth') return true
  return route.path === `/${locale.value}/auth`
})

const errorModal = useErrorModal()
errorModal.$subscribe((mutation, state) => {
  if (!state.show) state.message = ''
})

</script>