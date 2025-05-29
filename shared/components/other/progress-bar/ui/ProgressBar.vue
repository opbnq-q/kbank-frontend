<template>
  <section>
    <div class="w-full h-6 bg-secondary-bg border-primary-border border-[1px] rounded">
      <div class="h-6 bg-[var(--accent-light-green)] rounded" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="mt-2 text-sm">
      {{ props.complete }} / {{ props.price }} {{ t('standardUnit') }}
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  price: number
  complete: number
}>()

const { t } = useI18n()

const progress = computed(() => {
  return Math.min(
    100,
    Math.round((props.complete / props.price) * 100)
  )
})
</script>

<style></style>