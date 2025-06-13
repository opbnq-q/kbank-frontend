<template>
    <nav class="w-full h-18 flex items-center justify-between">
        <SharedLogo width="100" @click="navigateTo('/')" class="cursor-pointer max-sm:hidden"></SharedLogo>
        <div class="flex items-center gap-6 max-sm:justify-between max-sm:w-full">
            <div class="w-20">
                <SharedBaseButton back square v-if="$route.fullPath.length > 1" />
            </div>
            <FeatureLangSwitcher class="w-[100px]"></FeatureLangSwitcher>
            <div class="flex w-20 justify-between">
                <SharedBaseButton square @click="profile.logout">
                    <Icon name="carbon:exit" />
                </SharedBaseButton>
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