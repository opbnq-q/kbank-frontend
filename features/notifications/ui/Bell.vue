<template>
    <div class="relative">
        <CommonBaseButton square @click="navigateTo('/notifications')">
            <div v-show="n.len" class="bg-red-600 rounded-full absolute -top-0.5 z-30 -right-0.5 w-2 h-2"></div>
            <Icon name="carbon:notification"></Icon>
        </CommonBaseButton>
    </div>
</template>

<script setup lang="ts">
const n = useNotificationsStore()
</script>