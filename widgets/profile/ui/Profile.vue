<template>
    <section class="flex flex-col items-start justify-start gap-5">
        <SharedInfoCard class="w-full max-sm:h-24">
            {{ profileStore.balance }} {{ t('standardUnit') }}
        </SharedInfoCard>
        <div class="grid grid-cols-2 w-full gap-5 max-sm:grid-cols-1">
            <SharedInfoCard class="w-full" color="blue" to="/profile/my-debts">
                {{ t('yourDebts') }}
            </SharedInfoCard>
            <SharedInfoCard class="w-full" color="green" to="/profile/my-owned-debts">
                {{ t('yourOwnedDebts') }}
            </SharedInfoCard>
        </div>
        <SharedInfoCard class="w-full" color="pink" to="/leaderboard">
            {{ t('leaderboard') }}
        </SharedInfoCard>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const profileStore = useProfileStore()

onMounted(profileStore.load)
</script>