<template>
    <section class="flex items-center">
        <Icon name="carbon:checkmark" v-if="status == 'NOT_VIEWED'"></Icon>
        <Icon v-else-if="status === 'DENIED'" name="ci:close-md" class="text-[var(--accent-light-red)]"></Icon>
        <Icon v-else name="carbon:checkmark-outline" :class="{'text-[var(--accent-light-green)]': status == 'ACCEPTED'}" ></Icon>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    status: "NOT_VIEWED" | "IGNORED" | "ACCEPTED" | "DENIED"
}>()
</script>