<template>
    <article
        class="w-full  max-w-80 relative border-[1px] gap-4 flex-col flex p-4 border-primary-border bg-secondary-bg rounded-2xl min-h-40">
        <NuxtLink :to="`/debts/${props.id}`" class="hover:underline">
            <h1 class="text-xl h-6 overflow-hidden text-ellipsis ">{{ props.title }}</h1>
            <h2 class="h-6 overflow-hidden text-ellipsis">{{ props.description }}</h2>
        </NuxtLink>
        <SharedProgressBar :complete :price></SharedProgressBar>
        <div class="flex items-center justify-between">
            <h3>{{ props.name }}</h3>
            <SharedViewedStatus :status></SharedViewedStatus>
        </div>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: number
    title: string
    description?: string
    price: number
    complete: number
    name: string
    status: DebtStatus
}>()

</script>