<template>
    <nav class="w-full h-18 flex items-center justify-between">
        <SharedLogo width="100" @click="navigateTo('/')" class="cursor-pointer max-sm:hidden"></SharedLogo>
        <div class="flex items-center gap-4 max-sm:justify-between max-sm:w-full">
            <SharedBaseButton back square v-if="$route.fullPath.length > 1" />
            <FeatureLangSwitcher class="w-[100px]"></FeatureLangSwitcher>
            <ClientOnly>
                <FeatureBell></FeatureBell>
            </ClientOnly>
        </div>
    </nav>
</template>