<template>
    <ClientOnly>
        <ul class="flex flex-col items-end gap-2">
            <motion.li layout :key="index" v-for="(n, index) in notificationsStore.notifications">
                <EntityToast class="relative" @remove="notificationsStore.remove(n)">
                    <h1>{{ n.message }}</h1>
                    <SharedInternalLink :to="n.link" v-if="n.link">{{ t('go') }}
                    </SharedInternalLink>
                </EntityToast>
            </motion.li>
        </ul>
    </ClientOnly>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';

const notificationsStore = useNotificationsStore()
const { t } = useI18n()

</script>