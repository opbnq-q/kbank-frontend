<template>
    <nav class="w-full h-18 flex items-center justify-between">
        <CommonLogo width="100" @click="navigateTo('/')" class="cursor-pointer max-sm:hidden"></CommonLogo>
        <div class="flex items-center gap-6 max-sm:justify-between max-sm:w-full">
            <div class="w-20">
                <CommonBaseButton back square v-if="$route.fullPath.length > 1" />
            </div>
            <FeatureLangSwitcher class="w-[100px]"></FeatureLangSwitcher>
            <div class="flex w-20 justify-between">
                <CommonBaseButton square @click="profile.logout">
                    <Icon name="carbon:exit" />
                </CommonBaseButton>
                <ClientOnly>
                    <FeatureBell></FeatureBell>
                </ClientOnly>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const profile = useProfileStore()
</script>