<script setup lang="ts">
const { t } = useI18n()

const error = useError()
</script>

<template>
    <div class="flex items-center justify-center h-screen w-full flex-col gap-4 px-4">
        <CommonLogo width="200"></CommonLogo>
        <div class="flex flex-col max-w-80 items-start gap-1">
            <h1>{{ t('error.header') }}: {{ error?.statusCode }}</h1>
            <h2 class="text-sm">{{ error?.message }}</h2>
            <CommonInternalLink to="/">{{ t('linkToMain') }}</CommonInternalLink>
        </div>
    </div>
</template>