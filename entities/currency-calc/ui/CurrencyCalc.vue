<template>
    <CommonInfoCard>
        <h1 class="text-lg">{{ price }} {{ currency.title }}</h1>
        <h2>{{ price * currency.standardUnits }} {{ t('standardUnit') }}</h2>
        <div class="flex justify-between mt-4">
            <CommonBaseButton large square @click="handlePlus">
                <Icon name="carbon:add" size="1.4rem" />
            </CommonBaseButton>
            <CommonBaseButton large square @click="handleMinus" :disabled="!(price - 1)">
                <Icon name="ix:minus" />
            </CommonBaseButton>
        </div>
    </CommonInfoCard>
</template>

<script setup lang="ts">
const { t } = useI18n()

const price = defineModel<number>({ required: true })

defineProps<{
    currency: Currency
}>()

const handlePlus = () => {
   price.value++
}

const handleMinus = () => {
    if (price.value-1) price.value--
}
</script>
