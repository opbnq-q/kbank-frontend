<template>
    <div>
        <div class="relative">
            <input :type="type" v-model="inputValue" @focus="() => { isFocused = true; emits('focus') }"
                @blur="() => { isFocused = false; emits('blur') }" :name="label"
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
const props = defineProps<{
    placeholder?: string
    label?: string
    type?: "number" | "text" | "email" | "password"
    required?: boolean
    pattern?: string
    maxlength?: string
    minlength?: string
    max?: string
    error?: string
    default?: string
}>()

const isFocused = ref(false)

const inputValue = defineModel<string | number>()

if (props.default !== undefined && (inputValue.value === undefined || inputValue.value === '')) {
    inputValue.value = props.default
}

const isActive = computed(() => isFocused.value || (inputValue.value !== '' && inputValue.value !== undefined))

const emits = defineEmits<{
    (e: "focus"): void
    (e: "blur"): void
}>()
</script>