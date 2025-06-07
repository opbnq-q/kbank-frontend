<template>
    <section class="flex flex-col items-start justify-start gap-5">
        <SharedInfoCard class="w-full max-sm:h-24">
            {{ profileStore.balance }} {{ t('standardUnit') }}
        </SharedInfoCard>
        <div class="flex w-full gap-5 max-sm:flex-col">
            <SharedInfoCard class="w-full" color="blue" to="/profile/my-debts">
                {{ t('yourDebts') }}
            </SharedInfoCard>
            <SharedInfoCard class="w-full" color="green">
                {{ t('yourOwnedDebts') }}
            </SharedInfoCard>
        </div>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const profileStore = useProfileStore()

onMounted(profileStore.load)
</script>