<template>
    <div class="grid place-items-center grid-cols-3 gap-y-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <LazyEntityDebtCard v-for="debt in debtsTape.debts" :complete="debt.complete * debt.currency.standardUnits"
            :price="debt.price * debt.currency.standardUnits" :status="debt.status" :name="debt.lender.firstName"
            :description="debt.description" :title="debt.title"></LazyEntityDebtCard>
    </div>
</template>

<script setup lang="ts">

const debtsTape = useDebtsTapeStore()
</script>
