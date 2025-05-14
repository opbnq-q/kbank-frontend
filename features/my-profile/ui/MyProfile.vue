<template>
    <div class="flex flex-col items-start justify-start gap-5">
        <EntityInfoCard class="w-full max-sm:h-24 flex items-center">
            {{ profileStore.balance }} {{ t('standardUnit') }}
        </EntityInfoCard>
        <div class="flex w-full gap-5 max-sm:flex-col">
            <EntityInfoCard class="w-full" color="blue">
                {{ t('yourDebts') }}
            </EntityInfoCard>
            <EntityInfoCard class="w-full" color="green">
                {{ t('yourOwnedDebts') }}
            </EntityInfoCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const profileStore = useMyProfile()

onMounted(profileStore.load)
</script>