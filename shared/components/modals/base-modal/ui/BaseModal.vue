<script setup lang="ts">
const show = defineModel<boolean>('show', { required: true })

defineProps<{
    header?: string
    hideCloseButton?: boolean
}>()

const isRealShow = ref(false)

let timeout: null | ReturnType<typeof setTimeout> = null

watch(show, () => {
    if (show.value) {
        timeout = setTimeout(() => {
            isRealShow.value = true
        }, 100)
    } else {
        isRealShow.value = false
    }
})

onBeforeUnmount(() => {
    timeout && clearTimeout(timeout)
})
</script>

<template>
    <div :class="[{ 'invisible opacity-0': !show, 'visible': show }, 'fixed inset-0 flex items-center justify-center transition']">
        <div class="fixed -z-10 w-full h-full backdrop-blur-xs"></div>
        <dialog v-beyond-click="() => !hideCloseButton && isRealShow && (show = false)" open
            :class="[{ 'scale-0': !show }, 'm-auto duration-100 border-[1px] rounded-xl border-primary-border px-5 py-4 bg-secondary-bg text-primary-text']">
            <div :class="['flex items-center gap-5', { 'justify-end': !header, 'justify-between': header }]">
                <h1 class="text-lg font-medium" v-if="header">{{ header }}</h1>
                <SharedCloseButton v-if="!hideCloseButton" @click="show = false"></SharedCloseButton>
            </div>
            <div class="my-2">
                <slot></slot>
            </div>
        </dialog>
    </div>
</template>