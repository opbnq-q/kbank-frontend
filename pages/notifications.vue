<template>
  <div class="flex flex-col w-full gap-4">
    <SharedInfoCard v-if="n.len" v-for="notification in n.notifications">
      {{ notification.message }}
      <SharedInternalLink :to="notification.link" v-if="notification.link" class="mt-1">{{ t('go') }}
      </SharedInternalLink>
    </SharedInfoCard>
    <SharedEmptyImg v-else></SharedEmptyImg>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth-middleware'
})
const n = useNotificationsStore()
const { t } = useI18n()
</script>

<style></style>