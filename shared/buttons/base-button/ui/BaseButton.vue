<template>
    <button :class="[`px-2 py-1 rounded-md bg-secondary-bg
        border-[1px] border-primary-border transition 
        hover:bg-primary-hover active:bg-secondary-bg 
        active:scale-90
        cursor-pointer`, {'h-10 font-bold': large}]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    large?: boolean
}>()
</script>