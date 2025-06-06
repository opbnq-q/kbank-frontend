<template>
  <section>
    <div class="w-full h-6 bg-secondary-bg border-primary-border border-[1px] rounded">
      <div class="h-6 from-accent-green to-accent-blue bg-linear-to-br rounded progress-bar-inner" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="mt-2 text-sm flex gap-1">
      {{ props.complete }} / {{ props.price }} <p v-if="!hideSU">{{ t('standardUnit') }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  price: number
  complete: number
  hideSU?: boolean
}>()

const { t } = useI18n()

const progress = computed(() => {
  return Math.min(
    100,
    Math.round((props.complete / props.price) * 100)
  )
})
</script>

<style>
.progress-bar-inner {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>