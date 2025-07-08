<template>
        <form class="flex flex-col gap-6 w-full max-w-80" @submit.prevent="registerStore.submit(t)">
            <CommonBaseInput label="email" type="email" :placeholder="t('register.email')" v-model="registerStore.email"
                :error="registerStore.errors.email" />
            <CommonBaseInput label="firstName" :placeholder="t('register.firstName')" v-model="registerStore.firstName"
                :error="registerStore.errors.firstName" />
            <CommonBaseInput label="lastName" :placeholder="t('register.lastName')" v-model="registerStore.lastName"
                :error="registerStore.errors.lastName" />
            <CommonBaseInput label="password" type="password" :placeholder="t('register.password')"
                v-model="registerStore.password" :error="registerStore.errors.password" />
            <CommonBaseInput label="confirmPassword" type="password" :placeholder="t('register.confirmPassword')"
                v-model="registerStore.confirmPassword" :error="registerStore.errors.confirmPassword" />
            <CommonBaseButton large type="submit">{{ t('register.submit') }}</CommonBaseButton>
            <CommonInternalLink @click="emits('bottomButton')">{{ t('register.changeLoginMode') }}</CommonInternalLink>
        </form>
</template>

<script setup lang="ts">
const { t } = useI18n()
const registerStore = useRegisterFormStore()

const emits = defineEmits<{
    (e: "bottomButton"): void
}>()
</script>