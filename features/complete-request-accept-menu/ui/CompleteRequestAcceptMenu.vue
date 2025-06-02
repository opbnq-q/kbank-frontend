<template>
    <section 
      class="w-full grid grid-cols-2 gap-4 mt-8">
      <button @click="async () => {
        const result = await deny(debt.id)
        if (result == 'success') {
          debt!.status = DebtStatus.DENIED
          debtsTape.changeStatusById(debt!.id, DebtStatus.DENIED)
        }
      }"
        class="bg-[var(--accent-light-red)] p-4 hover:opacity-90 rounded-xl text-primary-bg cursor-pointer transition active:scale-90">Deny</button>
      <button @click="async () => {
        const result = await accept(debt.id)
        if (result == 'success') {
          debt!.status = DebtStatus.ACCEPTED
          debtsTape.changeStatusById(debt!.id, DebtStatus.ACCEPTED)
          const result = await $ofetch<ServerResponseTemplate<Debt>>(`/debts/${debt.id}`)
          if (result.status == 'success') {
            debt = result.data
          }
        }
      }"
        class="bg-[var(--accent-light-green)] hover:opacity-90 p-4 rounded-xl text-primary-bg cursor-pointer transition active:scale-90">Accept</button>
    </section>
</template>

<script setup lang="ts">
const debt = defineModel<Debt>({ required: true })
import { deny } from '../api/deny.api';
import { accept } from '../api/accept.api';

const debtsTape = useDebtsTapeStore()
</script>