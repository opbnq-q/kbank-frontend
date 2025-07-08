<template>
    <CommonBaseModal v-model:show="createNewCurrency.show">
        <div class="w-[80dvw] max-sm:w-[85dvw] max-h-[90dvh] max-w-2xl overflow-auto mt-4">
            <form @submit.prevent="createNewCurrency.submit(t)" class="flex flex-col gap-6 pt-6">
                <CommonBaseInput v-model="createNewCurrency.title" :placeholder="t('createNewCurrency.title') + '*'" :error="createNewCurrency.errors.title"></CommonBaseInput>
                <CommonBaseInput v-model="createNewCurrency.description" :placeholder="t('createNewCurrency.description')" :error="createNewCurrency.errors.description"></CommonBaseInput>
                <CommonBaseInput v-model="createNewCurrency.standardUnits" type="number" :placeholder="t('createNewCurrency.standardUnits')  + '*'" :error="createNewCurrency.errors.standardUnits"></CommonBaseInput>
                <CommonBaseButton type="submit" large>{{ t('createNewCurrency.submit') }}</CommonBaseButton>
            </form>
        </div>
    </CommonBaseModal>
</template>

<script setup lang="ts">
const { t } = useI18n()
const createNewCurrency = useCreateNewCurrencyStore()

</script>