<template>
    <button :class="[`px-2 py-1 rounded-md bg-secondary-bg
        border-[1px] border-primary-border transition 
        hover:bg-primary-hover active:bg-secondary-bg 
        active:scale-90
        cursor-pointer flex items-center justify-center`, { 'h-10 font-bold': large, 'aspect-square': square }]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    large?: boolean
    square?: boolean
}>()
</script>