<template>
    <CommonInfoCard>
        <h1 class="text-lg text-wrap">{{ title }}</h1>
        <h1 class="text-wrap">1 {{ title }} = {{ standardUnits }} {{ t('standardUnit') }}</h1>
        <h2 class="text-sm" v-if="description">{{ description }}</h2>
    </CommonInfoCard>
</template>

<script lang="ts" setup>
defineProps<{
    title: string
    description?: string
    standardUnits: number
}>()

const { t } = useI18n()
</script>