<template>
    <section class="w-full gap-2 flex flex-col p-4 bg-secondary-bg border-primary-border border-[1px] rounded-xl">
        <h1 class="text-lg text-wrap">{{ title }}</h1>
        <h1 class="text-wrap">1 {{ title }} = {{ standardUnits }} {{ t('standardUnit') }}</h1>
        <h2 class="text-sm" v-if="description">{{ description }}</h2>
    </section>
</template>

<script lang="ts" setup>
defineProps<{
    title: string
    description?: string
    standardUnits: number
}>()

const { t } = useI18n()
</script>