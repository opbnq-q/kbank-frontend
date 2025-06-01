<template>
    <div class="p-4 relative border-[1px] border-primary-border bg-secondary-bg rounded-xl">
        <h1 class="text-lg">{{ completeRequest.title }}</h1>
        <h2 class="text-wrap">{{ completeRequest.price }} {{ currencyTitle }} = {{ completeRequest.price * standardUnits }} {{
            t('standardUnit') }}</h2>
        <h3 class="text-sm">{{ completeRequest.description }}</h3>
        <div v-if="(completeRequest.status == CompleteRequestStatus.IGNORED || completeRequest.status == CompleteRequestStatus.NOT_VIEWED) && profileId == lenderId"
            class="flex gap-2 mt-2">
            <SharedBaseButton square @click="emits('accept')">
                <Icon name="carbon:checkmark"></Icon>
            </SharedBaseButton>
            <SharedBaseButton square @click="emits('deny')">
                <Icon name="carbon:close"></Icon>
            </SharedBaseButton>
        </div>
        <SharedViewedStatus :status="completeRequest.status" class="absolute right-4 bottom-4"></SharedViewedStatus>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

defineProps<{
    standardUnits: number
    completeRequest: CompleteRequest
    profileId: number
    lenderId: number
    currencyTitle: string
}>()

const emits = defineEmits<{
    (e: 'deny'): void
    (e: 'accept'): void
}>()
</script>