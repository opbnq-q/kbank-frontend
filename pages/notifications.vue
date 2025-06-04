<template>
  <div>
    <SharedInfoCard v-for="(notification, index) in n.notifications">
      {{ index + 1 }} {{ notification.message }}
    </SharedInfoCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth-middleware'
})
const n = useNotificationsStore()
</script>

<style>

</style>