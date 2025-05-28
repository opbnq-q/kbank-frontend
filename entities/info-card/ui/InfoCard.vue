<template>
    <div :class="[
        'bg-secondary-bg relative flex flex-col justify-center px-6 py-4 hover:text-primary-bg border-[1px] border-primary-border rounded-xl transition',
        infoCardColor,
        {'cursor-pointer': to}
    ]" @click="to && navigateTo(to)">
        <slot></slot>
        <Icon name="carbon:arrow-right" v-if="to" class="absolute right-4"></Icon>
    </div>
</template>

<script setup lang="ts">
type Color = 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'red' | 'pink'

const { color = "pink" } = defineProps<{
    color?: Color
    to?: string
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
