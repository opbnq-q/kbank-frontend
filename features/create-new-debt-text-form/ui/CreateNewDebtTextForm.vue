<template>
    <form class="flex flex-col gap-6 h-full justify-end relative">
        <div class="flex h-1/2 items-center justify-center">
            <CommonLogo></CommonLogo>
        </div>
        <CommonBaseInput v-model="textForm.title" :placeholder="t('createNewDebt.title') + '*'"></CommonBaseInput>
        <CommonBaseInput v-model="textForm.description" :placeholder="t('createNewDebt.description')"></CommonBaseInput>
    </form>
</template>

<script setup lang="ts">
const textForm = useCreateNewDebtTextFormStore()

const { t } = useI18n()

</script>