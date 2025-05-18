<template>
    <nav class="w-full h-18 flex items-center px-4 justify-between">
        <SharedLogo width="100" @click="navigateTo('/')" class="cursor-pointer"></SharedLogo>
        <div class="flex items-center gap-4">
            <FeatureLangSwitcher class="w-[100px]"></FeatureLangSwitcher>
            <ClientOnly>
                <FeatureNotifications></FeatureNotifications>
            </ClientOnly>
        </div>
    </nav>
</template>