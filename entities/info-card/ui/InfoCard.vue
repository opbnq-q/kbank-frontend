<template>
    <div
        :class="[
            'bg-secondary-bg px-6 py-4 hover:text-primary-bg border-[1px] border-primary-border rounded-xl transition',
            cardColorClass
        ]"
    >
        asdasd
    </div>
</template>

<script setup lang="ts">
import { COLORS, type Color } from '../model/const';

const { color = "yellow" } = defineProps<{
    color?: Color
}>()

const cardColorClass = computed(() => {
    const result: Record<string, boolean> = {}
    Object.keys(COLORS).map(k => {
        result[`hover:bg-[${COLORS[k as Color]}]`] = k == color
    })
    return result
})
</script>