<template>
    <div :class="[
        'bg-secondary-bg px-6 py-4 hover:text-primary-bg border-[1px] border-primary-border rounded-xl transition',
        infoCardColor
    ]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Color = 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'red' | 'pink'

const { color = "pink" } = defineProps<{
    color?: Color
}>()

const infoCardColor = computed(() => {
    switch (color) {
        case 'green':
            return 'hover:bg-[var(--accent-light-green)]'
        case 'blue':
            return 'hover:bg-[var(--accent-light-blue)]'
        case 'yellow':
            return 'hover:bg-[var(--accent-light-yellow)]'
        case 'orange':
            return 'hover:bg-[var(--accent-light-orange)]'
        case 'purple':
            return 'hover:bg-[var(--accent-light-purple)]'
        case 'red':
            return 'hover:bg-[var(--accent-light-red)]'
        case 'pink':
            return 'hover:bg-[var(--accent-light-pink)]'
    }
})
</script>
