<template>
        <form class="flex flex-col gap-6 w-full max-w-80" @submit.prevent="loginStore.submit(t)">
        <SharedBaseInput label="email" type="email" :placeholder="t('login.email')" v-model="loginStore.email"
            :error="loginStore.errors.email" />
        <SharedBaseInput label="password" type="password" :placeholder="t('login.password')"
            v-model="loginStore.password" :error="loginStore.errors.password" />
        <SharedBaseButton large type="submit">{{ t('login.submit') }}</SharedBaseButton>
        <SharedInternalLink @click="emits('bottomButton')">{{ t('login.changeLoginMode') }}</SharedInternalLink>
    </form>
</template>

<script setup lang="ts">
const { t } = useI18n()
const loginStore = useLoginFormStore()

const emits = defineEmits<{
    (e: 'bottomButton'): void
}>()
</script>