<template>
    <img src="~/public/logo.png" alt="logo" :width class="shadow-black shadow-2xl"></img>
</template>

<script setup lang="ts">
const { width='240' } = defineProps<{width?: string}>()
</script>