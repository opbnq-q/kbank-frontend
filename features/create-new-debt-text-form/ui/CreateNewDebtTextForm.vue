<template>
    <form class="flex flex-col gap-6">
        <SharedBaseInput v-model="textForm.title" :placeholder="t('createNewDebt.title')"></SharedBaseInput>
        <SharedBaseInput v-model="textForm.description" :placeholder="t('createNewDebt.description')"></SharedBaseInput>
    </form>
</template>

<script setup lang="ts">
const textForm = useCreateNewDebtTextFormStore()

const { t } = useI18n()

</script>