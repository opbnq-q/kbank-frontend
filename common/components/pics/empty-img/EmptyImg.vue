<template>
  <div class="flex flex-col items-center">
    <div class="h-16 flex items-center justify-center aspect-square">
      <AnimatePresence mode="wait">
        <motion.h1 :exit="{ opacity: 0, scale: 0 }" :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }" v-if="isToggled" class="text-5xl">🐔</motion.h1>
        <motion.div v-else class="grid grid-cols-2 gap-2" :exit="{ opacity: 0, scale: 0 }"
          :initial="{ opacity: 0, scale: 0 }" :animate="{ opacity: 1, scale: 1 }">
          <motion.h2 v-for="hen in hens" :key="hen" layout>{{ hen }}</motion.h2>
        </motion.div>
      </AnimatePresence>
    </div>
    <h1 class="text-sm font-bold flex">
      <motion.div layout :initial="{ opacity: 0, y: -2 }" :animate="{ opacity: 1, y: 0 }" :transition="{
        duration: 0.1,
        delay: index * 0.02,
      }" v-for="(letter, index) in t('nothing')" :key="index + locale">
        <p v-if="letter != ' '">{{ letter }}</p>
        <p v-else class="w-2 h-2"></p>
      </motion.div>
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';

const { t, locale } = useI18n()

const [isToggled, toggle] = useToggle()
let intervals: ReturnType<typeof setInterval>[] = []
const hens = useState('hens', () => ['🐔', '🐓', '🐣', '🐤'])
const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.6)
}

onMounted(() => {
  intervals.push(setInterval(() => {
    toggle()
  }, 3000))
  intervals.push(setInterval(() => {
    hens.value = shuffle(hens.value)
  }, 1000))
})

onBeforeUnmount(() => {
  intervals.forEach(clearInterval)
})
</script>

<style></style>