<template>
    <div class="h-screen w-full items-center justify-center flex flex-col">
        <SharedLogo class="mb-12"></SharedLogo>
        <FeatureRegisterForm v-if="!loginMode" @bottom-button="changeLoginMode"></FeatureRegisterForm>
        <FeatureLoginForm v-else @bottom-button="changeLoginMode"></FeatureLoginForm>
    </div>
</template>

<script setup lang="ts">
const loginMode = ref(false)
const changeLoginMode = () => loginMode.value = !loginMode.value

</script>