<template>
    <div>
        <SharedBaseInput class="mt-6" :placeholder="t('createNewDebt.search')"
            v-model="createNewDebtSelectDebtor.search" @input="createNewDebtSelectDebtor.handleInput"></SharedBaseInput>
        <ul class="mt-6 flex flex-col gap-4" v-show="filtered.length && createNewDebtSelectDebtor.search">
            <ClientOnly>
                <div v-for="debtor in filtered" class="cursor-pointer"
                    :class="{ 'p-[1px] bg-linear-to-br from-accent-green to-accent-blue rounded-xl': debtor.id == createNewDebtSelectDebtor.debtor?.id }">
                    <LazyEntityUserCard :class="{ 'border-none': debtor.id == createNewDebtSelectDebtor.debtor?.id }"
                        @click="createNewDebtSelectDebtor.debtor = debtor" hide-go :key="debtor.email"
                        :balance="debtor.balance" :id="debtor.id" :name="`${debtor.firstName} ${debtor.lastName}`">
                    </LazyEntityUserCard>
                </div>
            </ClientOnly>

        </ul>
        <SharedEmptyImg class="mt-6"
            v-show="createNewDebtSelectDebtor.search && !filtered.length" />
        <p class="text-sm mt-4" v-show="!createNewDebtSelectDebtor.search">
            {{ t('createNewDebt.findDebtor') }}</p>
    </div>
</template>

<script setup lang="ts">
const createNewDebtSelectDebtor = useCreateNewDebtSelectDebtorStore();
const { t } = useI18n()

const props = defineProps<{
    profileId: number
}>()

const filtered = computed(() => createNewDebtSelectDebtor.debtors.filter(d => d.id != props.profileId))

</script>