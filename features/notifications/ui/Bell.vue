<template>
    <div class="relative">
        <SharedBaseButton square @click="navigateTo('/notifications')">
            <div class="bg-red-600 rounded-full absolute -top-0.5 z-30 -right-0.5 w-2 h-2"></div>
            <Icon name="carbon:notification"></Icon>
        </SharedBaseButton>
    </div>
</template>