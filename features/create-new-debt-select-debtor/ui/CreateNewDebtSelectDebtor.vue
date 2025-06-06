<template>
    <div>
        <SharedBaseInput class="mt-6" :placeholder="t('createNewDebt.search')"
            v-model="createNewDebtSelectDebtor.search" @input="createNewDebtSelectDebtor.handleInput"></SharedBaseInput>
        <ul class="mt-6 flex flex-col gap-4" v-show="createNewDebtSelectDebtor.debtors.length">
            <ClientOnly>
                <div v-for="debtor in createNewDebtSelectDebtor.debtors" class="cursor-pointer"
                    :class="{ 'p-[1px] bg-linear-to-br from-accent-green to-accent-blue rounded-xl': debtor.id == createNewDebtSelectDebtor.debtorId }">
                    <LazyEntityUserCard :class="{ 'border-none': debtor.id == createNewDebtSelectDebtor.debtorId }"
                        @click="createNewDebtSelectDebtor.debtorId = debtor.id" find-go :key="debtor.email"
                        :balance="debtor.balance" :id="debtor.id" :name="`${debtor.firstName} ${debtor.lastName}`">
                    </LazyEntityUserCard>
                </div>
            </ClientOnly>

        </ul>
        <SharedEmptyImg class="mt-6"
            v-show="createNewDebtSelectDebtor.search && !createNewDebtSelectDebtor.debtors.length" />
        <p class="mt-4 text-sm" v-show="!createNewDebtSelectDebtor.search && !createNewDebtSelectDebtor.debtors.length">
            {{ t('createNewDebt.findDebtor') }}</p>
    </div>
</template>

<script setup lang="ts">
import { LazyEntityUserCard } from '#components';
import { useCreateNewDebtSelectDebtorStore } from '../model/create-new-debt-select-debtor.store';

const createNewDebtSelectDebtor = useCreateNewDebtSelectDebtorStore();
const { t } = useI18n()
</script>