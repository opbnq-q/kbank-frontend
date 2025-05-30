<template>
    <button @click="() => {
        if (back) {
            router.back()
        }
    }" :class="[`px-2 py-1 rounded-md bg-secondary-bg
        border-[1px] border-primary-border transition 
        hover:bg-primary-hover active:bg-secondary-bg 
        active:scale-90
        cursor-pointer flex items-center justify-center`, { 'h-10 font-bold': large, 'aspect-square': square }]">
        <Icon v-if="back" name="carbon:arrow-left"></Icon>
        <slot v-else></slot>

    </button>
</template>

<script setup lang="ts">
const router = useRouter()

defineProps<{
    large?: boolean
    square?: boolean
    back?: boolean
}>()
</script>