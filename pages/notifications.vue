<template>
  <div class="flex flex-col w-full gap-4">
    <CommonInfoCard v-if="n.len" v-for="notification in n.notifications">
      {{ notification.message }}
      <CommonInternalLink :to="notification.link" v-if="notification.link" class="mt-1">{{ t('go') }}
      </CommonInternalLink>
    </CommonInfoCard>
    <CommonEmptyImg v-else></CommonEmptyImg>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth-middleware'
})

useHead({
  title: "Notifications"
})

const n = useNotificationsStore()
const { t } = useI18n()
</script>

<style></style>