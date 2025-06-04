<template>
  <div class="w-full h-full flex flex-col gap-4">
    <section class="h-full overflow-y-auto">
      <slot :name="p + 1"></slot>
    </section>
    <section class="w-full">
      <div class="w-full flex justify-between mb-2">
        <SharedBaseButton @click="prevStep">Prev</SharedBaseButton>
        <SharedBaseButton @click="nextStep">Next</SharedBaseButton>
      </div>
      <span >
        <SharedProgressBar :complete="p + 1" :price="count" hide-s-u></SharedProgressBar>
      </span>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const slots = defineSlots()

const count = computed(() => Object.keys(slots).length)

const p = ref(0)

function nextStep() {
  if (p.value < count.value - 1) {
    p.value++
  }
}

function prevStep() {
  if (p.value > 0) {
    p.value--
  }
}
</script>