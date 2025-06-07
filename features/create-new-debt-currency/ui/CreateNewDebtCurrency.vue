<template>
    <SharedBaseInput v-model="createNewDebtCurrency.search" @input="createNewDebtCurrency.handleInput"
        :placeholder="t('createNewDebt.search')" class="my-6"></SharedBaseInput>
    <p class="text-sm" v-show="!createNewDebtCurrency.search">{{
        t('createNewDebt.findOr')
    }} <SharedInternalLink to="/currency/new">{{ t('createNewDebt.createNewCurrency') }}</SharedInternalLink>
    </p>
    <SharedEmptyImg v-show="createNewDebtCurrency.search && !createNewDebtCurrency.currencies.length"
        message="not found" />
    <ul class="flex flex-col gap-4" v-show="createNewDebtCurrency.search && createNewDebtCurrency.currencies.length">
        <ClientOnly>
            <div v-for="currency in createNewDebtCurrency.currencies" class="cursor-pointer"
                :class="{ 'p-[1px] bg-linear-to-br from-accent-green to-accent-blue rounded-xl': currency.id == createNewDebtCurrency.currencyId }">
                <LazyEntityCurrencyCard :class="{ 'border-none': currency.id == createNewDebtCurrency.currencyId }"
                    @click="createNewDebtCurrency.currencyId = currency.id" :key="currency.id" :title="currency.title"
                    :description="currency.description" :standard-units="currency.standardUnits">
                </LazyEntityCurrencyCard>
            </div>
        </ClientOnly>
    </ul>
</template>

<script setup lang="ts">
const createNewDebtCurrency = useCreateNewDebtCurrencyStore()

const { t } = useI18n()
</script>
