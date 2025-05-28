<template>
    <div ref="toast"
        class="border-[1px] select-none overflow-hidden bg-secondary-bg border-primary-border max-w-xs p-4 rounded-xl">
        <slot></slot>
        <div class="h-1 absolute loading-line-animation ease-linear bottom-0 bg-[var(--accent-light-blue)] left-0">
        </div>
    </div>
</template>

<script setup lang="ts">
const toast = useTemplateRef<HTMLDivElement>('toast')
const initialToastOffsetLeft = ref(0);

const emits = defineEmits<{
  (e: 'remove'): void
}>()

const pointerSwipe = usePointerSwipe(toast, {
  threshold: 10,
  onSwipeStart: (e: PointerEvent) => {
    if (!toast.value) return;
    toast.value.style.transition = 'none';
    initialToastOffsetLeft.value = toast.value.offsetLeft;
  },
  onSwipe: (e: PointerEvent) => {
    if (!toast.value || !pointerSwipe.isSwiping.value) return;
    toast.value.style.left = `${initialToastOffsetLeft.value - pointerSwipe.distanceX.value}px`;
  },
  onSwipeEnd: (e: PointerEvent, direction) => {
    if (!toast.value) return;
    
    const finalDistanceX = pointerSwipe.distanceX.value;

    if ((direction === 'left' || direction === 'right') && Math.abs(finalDistanceX) > 50) {
      deleteToast(direction);
      emits('remove')
    } else {
      toast.value.style.transition = 'left 0.3s ease-out';
      toast.value.style.left = `${initialToastOffsetLeft.value}px`;
    }
  }
})

onMounted(() => {
  setTimeout(() => {
    deleteToast('right')
  }, 4000);
})

function deleteToast(swipeDirection?: "left" | "right") {
  if (!toast.value) return;

  const toastEl = toast.value;
  
  toastEl.style.transition = 'opacity 0.2s ease-out, left 0.2s ease-out';
  toastEl.style.opacity = '0';

  if (swipeDirection === 'left') {
    toastEl.style.left = `-${window.innerWidth}px`;
  } else if (swipeDirection === 'right') {
    toastEl.style.left = `${toastEl.offsetWidth}px`;
  }

  const removeElement = () => {
    if (toastEl.parentElement) {
      toastEl.parentElement.removeChild(toastEl);
    }
  };
  
  toastEl.addEventListener('transitionend', removeElement, { once: true });
}

</script>

<style scoped>
.loading-line-animation {
    animation-duration: 4s;
    animation-name: loading-line;
    animation-timing-function: linear;
    animation-fill-mode: both;
}

@keyframes loading-line {
    0% {
        width: 100%;
    }

    100% {
        width: 0%;
    }
}
</style>