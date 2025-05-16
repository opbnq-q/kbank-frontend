<template>
  <div class="flex flex-col items-center h-full w-full">
    <div class="max-w-7xl w-full">
      <WidgetNav v-if="!isAuthRoute" class="sticky" />
      <SharedErrorModal />
      <SharedLoadingModal />
      <div class="px-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

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