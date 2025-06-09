<template>
    <div class="grid place-items-center grid-cols-3 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <ClientOnly >
          <LazyEntityDebtCard v-for="debt in debts" :complete="debt.complete * debt.currency.standardUnits"
            :price="debt.price * debt.currency.standardUnits" :status="debt.status" :name="debt.lender.firstName"
            :description="debt.description" :title="debt.title" :id="debt.id"></LazyEntityDebtCard>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { useOwnedDebtsTapeStore, type MyOwnedDebtsTapeStoreState } from '../model/my-owned-debts-tape.store';

const { mode } = defineProps<{
    mode: "my" | 'owned'
}>()
const debtsTape = mode == 'my' ? useDebtsTapeStore() : useOwnedDebtsTapeStore()
const debts = computed(() => {
    if (mode == 'my') return (debtsTape as DebtsTapeStoreState).debts;
    return (debtsTape as MyOwnedDebtsTapeStoreState).myOwnedDebts
})
</script>
