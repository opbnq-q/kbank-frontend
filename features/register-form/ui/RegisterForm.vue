<template>
    <form class="flex flex-col gap-6 w-full max-w-80" @submit.prevent="registerStore.validateForm(t)
        ">
        <SharedBaseInput label="email" type="email" :placeholder="t('register.email')" v-model="registerStore.email"
            :error="registerStore.errors.email" />
        <SharedBaseInput label="firstName" :placeholder="t('register.firstName')" v-model="registerStore.firstName"
            :error="registerStore.errors.firstName" />
        <SharedBaseInput label="lastName" :placeholder="t('register.lastName')" v-model="registerStore.lastName"
            :error="registerStore.errors.lastName" />
        <SharedBaseInput label="password" type="password" :placeholder="t('register.password')"
            v-model="registerStore.password" :error="registerStore.errors.password" />
        <SharedBaseInput label="confirmPassword" type="password" :placeholder="t('register.confirmPassword')"
            v-model="registerStore.confirmPassword" :error="registerStore.errors.confirmPassword" />
        <SharedBaseButton large type="submit">{{ t('register.submit') }}</SharedBaseButton>
        <button type="button"
            class="text-primary-link text-start relative bottom-4 text-sm cursor-pointer transition hover:text-blue-400"
            @click="emits('bottomButton')">{{ t('register.changeLoginMode') }}</button>
    </form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRegisterFormStore } from '../model/register-form.store'

const { t } = useI18n()
const registerStore = useRegisterFormStore()

const emits = defineEmits<{
    (e: "bottomButton"): void
}>()
</script>