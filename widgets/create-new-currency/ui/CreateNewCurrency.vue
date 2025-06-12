<template>
    <SharedBaseModal v-model:show="createNewCurrency.show">
        <div class="w-[80dvw] max-sm:w-[85dvw] max-h-[90dvh] max-w-2xl overflow-auto mt-4">
            <form @submit.prevent="createNewCurrency.submit(t)" class="flex flex-col gap-6 pt-6">
                <SharedBaseInput v-model="createNewCurrency.title" :placeholder="t('createNewCurrency.title') + '*'" :error="createNewCurrency.errors.title"></SharedBaseInput>
                <SharedBaseInput v-model="createNewCurrency.description" :placeholder="t('createNewCurrency.description')" :error="createNewCurrency.errors.description"></SharedBaseInput>
                <SharedBaseInput v-model="createNewCurrency.standardUnits" type="number" :placeholder="t('createNewCurrency.standardUnits')  + '*'" :error="createNewCurrency.errors.standardUnits"></SharedBaseInput>
                <SharedBaseButton type="submit" large>{{ t('createNewCurrency.submit') }}</SharedBaseButton>
            </form>
        </div>
    </SharedBaseModal>
</template>

<script setup lang="ts">
const { t } = useI18n()
const createNewCurrency = useCreateNewCurrencyStore()

</script>