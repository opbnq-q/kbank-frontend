<template>
    <section class="flex flex-col items-start justify-start gap-5">
        <CommonInfoCard class="w-full max-sm:h-24">
            {{ profileStore.balance }} {{ t('standardUnit') }}
        </CommonInfoCard>
        <div class="grid grid-cols-2 w-full gap-5 max-sm:grid-cols-1">
            <CommonInfoCard class="w-full" color="blue" to="/profile/my-debts">
                {{ t('yourDebts') }}
            </CommonInfoCard>
            <CommonInfoCard class="w-full" color="green" to="/profile/my-owned-debts">
                {{ t('yourOwnedDebts') }}
            </CommonInfoCard>
        </div>
        <CommonInfoCard class="w-full" color="pink" to="/leaderboard">
            {{ t('leaderboard') }}
        </CommonInfoCard>
    </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const profileStore = useProfileStore()

onMounted(profileStore.load)
</script>