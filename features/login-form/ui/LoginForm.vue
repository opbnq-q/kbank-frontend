<template>
    <form class="flex flex-col gap-6 w-full max-w-80" @submit.prevent="registerStore.validateForm(t)">
        <SharedBaseInput label="email" type="email" :placeholder="t('login.email')" v-model="registerStore.email"
            :error="registerStore.errors.email" />
        <SharedBaseInput label="password" type="password" :placeholder="t('login.password')"
            v-model="registerStore.password" :error="registerStore.errors.password" />
        <SharedBaseButton large type="submit">{{ t('login.submit') }}</SharedBaseButton>
        <button type="button"
            class="text-primary-link text-start relative bottom-4 text-sm cursor-pointer transition hover:text-blue-400"
            @click="emits('bottomButton')">{{ t('login.changeLoginMode') }}</button>
    </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLoginFormStore } from '../model/login-form.store';

const { t } = useI18n()
const registerStore = useLoginFormStore()

const emits = defineEmits<{
    (e: 'bottomButton'): void
}>()
</script>