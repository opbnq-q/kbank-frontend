<template>
  <WidgetCreateNewDebt :profile-id="profile.id" />
</template>

<script setup lang="ts">
const profile = useProfileStore()
profile.load()
</script>