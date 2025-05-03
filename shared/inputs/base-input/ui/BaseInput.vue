<template>
    <div>
        <div class="relative">
            <input :type="type" v-model="inputValue" @focus="isFocused = true" @blur="isFocused = false" :name="label"
                class="bg-secondary-bg px-2 py-1 rounded-lg border-[1px] border-primary-border outline-none w-full focus:bg-primary-focus transition"
                :required="required" :pattern="pattern" :maxlength="maxlength" :minlength="minlength" :max="max" />
            <label :class="[
                'absolute left-2 pointer-events-none transition-all duration-200',
                isActive
                    ? '-top-1 text-xs -translate-y-full opacity-100'
                    : 'top-1/2 -translate-y-1/2 text-base opacity-60'
            ]">
                {{ placeholder }}
            </label>
        </div>
        <span v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export type HTMLInputTypeAttribute = "number" | "search" | "button" | "time" | "image" | "text" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "month" | "password" | "radio" | "range"

const props = defineProps<{
    placeholder?: string
    label?: string
    type?: HTMLInputTypeAttribute
    required?: boolean
    pattern?: string
    maxlength?: string
    minlength?: string
    max?: string
    error?: string
}>()

const inputValue = ref('')
const isFocused = ref(false)

const supportedTypes: readonly HTMLInputTypeAttribute[] = [
    'password', 'number', 'search', 'text', 'email'
]
const isActive = computed(() => isFocused.value || inputValue.value !== '' || !supportedTypes.includes(props.type || 'text'))
</script>