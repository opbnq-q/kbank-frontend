<template>
    <ClientOnly>
        <div class="flex flex-col items-end gap-2">
            <EntityToast class="relative" @remove="notificationsStore.remove(n)" v-for="n in notificationsStore.notifications">
                <h1>{{ n.message }}</h1>
                <SharedInternalLink :to="n.link" v-if="n.link">{{ t('go') }}
                </SharedInternalLink>
            </EntityToast>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
const notificationsStore = useNotificationsStore()
const { t } = useI18n()

</script>