<template>
  <div class="flex flex-col items-center h-full w-full px-5">
    <div class="max-w-7xl w-full">
      <ClientOnly>
        <WidgetNav v-if="!hideNav" class="sticky bg-primary-bg z-50" />
        <div v-else class="mb-4"></div>
      </ClientOnly>
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
const tokenManager = useTokenManager()

const hideNav = computed(() => {
  const path = route.fullPath
  const currentLocale = locale.value
  if (path.includes('/auth') || path.includes(`/${currentLocale}/auth`)) {
    return true
  }
  if (path.includes(`/leaderboard`) || path.includes(`/${currentLocale}/leaderboard`)) {
    return !tokenManager.get()
  }
  return false
})

const errorModal = useErrorModalStore()
errorModal.$subscribe((mutation, state) => {
  if (!state.show) state.message = ''
})

</script>