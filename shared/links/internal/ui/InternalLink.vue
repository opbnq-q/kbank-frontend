<template>
    <NuxtLink @click="back && router.back()" class="text-primary-link cursor-pointer transition hover:text-blue-400 text-sm"><slot></slot></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    back?: boolean
}>()

const router = useRouter()
</script>