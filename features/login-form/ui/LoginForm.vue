<template>
        <form class="flex flex-col gap-6 w-full max-w-80" @submit.prevent="loginStore.submit(t)">
        <CommonBaseInput label="email" type="email" :placeholder="t('login.email')" v-model="loginStore.email"
            :error="loginStore.errors.email" />
        <CommonBaseInput label="password" type="password" :placeholder="t('login.password')"
            v-model="loginStore.password" :error="loginStore.errors.password" />
        <CommonBaseButton large type="submit">{{ t('login.submit') }}</CommonBaseButton>
        <CommonInternalLink @click="emits('bottomButton')">{{ t('login.changeLoginMode') }}</CommonInternalLink>
    </form>
</template>

<script setup lang="ts">
const { t } = useI18n()
const loginStore = useLoginFormStore()

const emits = defineEmits<{
    (e: 'bottomButton'): void
}>()
</script>