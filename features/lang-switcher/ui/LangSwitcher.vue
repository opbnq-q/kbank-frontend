<script setup lang="ts">
import type { Locale } from 'vue-i18n'

const { locale, locales } = useI18n()
const switchLocale = useSwitchLocalePath()

const isOpened = ref(false)

const handleClick = (l: Locale) => {
    navigateTo(switchLocale(l))
    isOpened.value = false
}
</script>

<template>
    <div class="relative w-[100px] flex items-center justify-center">
        <SharedBaseButton :class="['w-full', {'scale-50': isOpened}]" @click="isOpened = true">{{ locales.find(el => el.code == locale)?.name }}</SharedBaseButton>
        <section
            :class="['absolute top-0 left-0 z-50 flex w-full flex-col border-[1px] border-primary-border p-2 rounded-xl items-center gap-2 transition bg-secondary-bg', { 'invisible scale-75 opacity-0': !isOpened }]">
            <SharedBaseButton class="w-20" v-for="l in locales" @click="handleClick(l.code)">
                {{ l.name }}
            </SharedBaseButton>
        </section>
    </div>
</template>