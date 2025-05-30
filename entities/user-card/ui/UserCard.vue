<template>
    <div class="bg-secondary-bg border-primary-border border-[1px] rounded-xl p-4">
        <h1 class="text-lg overflow-ellipsis overflow-hidden h-8">{{ name }}</h1>
        <h2 class="h-6 mb-2 overflow-ellipsis overflow-hidden">{{ balance }} {{ t('standardUnit') }}</h2>
        <SharedInternalLink :to="`/users/${id}`">{{ t('go') }}</SharedInternalLink>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
    name: string
    id: number | string
    balance: string | number
}>()
</script>