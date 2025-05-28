<template>
    <div>
        <div class="relative">
            <input :type="type" v-model="inputValue" @focus="isFocused = true" @blur="isFocused = false" :name="label"
                class="bg-secondary-bg px-2 py-1 rounded-lg border-[1px] border-primary-border outline-none w-full focus:bg-primary-focus transition"
                :required :pattern :maxlength :minlength :max />
            <label :class="[
                'absolute left-2 pointer-events-none transition-all duration-200',
                isActive
                    ? '-top-1 text-xs -translate-y-full opacity-100'
                    : 'top-1/2 -translate-y-1/2 text-base opacity-60'
            ]">
                {{ placeholder }}
            </label>
        </div>
        <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    placeholder?: string
    label?: string
    type?: "number" | "text" | "email" | "password"
    required?: boolean
    pattern?: string
    maxlength?: string
    minlength?: string
    max?: string
    error?: string
}>()

const isFocused = ref(false)

const inputValue = defineModel()

const isActive = computed(() => isFocused.value || inputValue.value !== '')
</script>