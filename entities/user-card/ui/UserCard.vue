<template>
    <SharedInfoCard>
        <h1 class="text-lg overflow-ellipsis overflow-hidden">{{ name }}</h1>
        <h2 class="h-6 overflow-ellipsis overflow-hidden">{{ balance }} {{ t('standardUnit') }}</h2>
        <SharedInternalLink  class="mt-2" v-if="!hideGo" :to="`/users/${id}`">{{ t('go') }}</SharedInternalLink>
    </SharedInfoCard>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
    name: string
    id: number | string
    balance: string | number
    hideGo?: boolean
}>()
</script>