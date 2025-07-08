<template>
  <div class="flex items-center justify-end m-4">
    <CommonBaseButton @click="scrollToTop" square large>
      <Icon name="carbon:arrow-up"></Icon>
    </CommonBaseButton>
  </div>
</template>

<script lang="ts" setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style></style>