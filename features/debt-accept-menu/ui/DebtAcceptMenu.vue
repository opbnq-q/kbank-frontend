<template>
  <section class="w-full overflow-hidden relative flex items-center touch-pan-y justify-center h-20 select-none">
    <h1 class="absolute left-0 opacity-80">{{ t('deny') }}</h1>
    <div ref="swipeMenu"
      class="bg-secondary-bg flex left-0 transition gap-4 items-center border-[1px] border-primary-border rounded-xl p-4 cursor-col-resize relative z-10">
      <Icon name="carbon:arrow-left" />
      <h1>{{ t('move') }}</h1>
      <Icon name="carbon:arrow-right" />
    </div>
    <h1 class="absolute right-0 opacity-80">{{ t('accept') }}</h1>
  </section>
</template>

<script setup lang="ts">
const debt = defineModel<Debt>({ required: true })
import { deny } from '../api/deny.api';
import { accept } from '../api/accept.api';

const { t } = useI18n()

const debtsTape = useDebtsTapeStore()

const onDeny = async () => {
  const result = await deny(debt.value.id)
  if (result == 'success') {
    debt.value.status = DebtStatus.DENIED
    debtsTape.changeStatusById(debt.value.id, DebtStatus.DENIED)
  }
}

const onAccept = async () => {
  const result = await accept(debt.value.id)
  if (result == 'success') {
    debt.value.status = DebtStatus.ACCEPTED
    debtsTape.changeStatusById(debt.value.id, DebtStatus.ACCEPTED)
  }
}

const swipeMenu = ref<HTMLElement | null>(null)
const initialPointerX = ref(0)
const initialLeft = ref(0)

const pointerSwipe = usePointerSwipe(swipeMenu, {
  threshold: 10,
  onSwipeStart: (e: PointerEvent) => {
    if (!swipeMenu.value) return
    swipeMenu.value.style.transition = 'none'
    const computed = window.getComputedStyle(swipeMenu.value)
    initialLeft.value = parseInt(computed.left, 10) || 0
    initialPointerX.value = e.clientX
  },
  onSwipe: (e: PointerEvent) => {
    if (!swipeMenu.value || !pointerSwipe.isSwiping.value) return
    const deltaX = e.clientX - initialPointerX.value
    swipeMenu.value.style.left = `${initialLeft.value + deltaX}px`
  },
  onSwipeEnd: (e: PointerEvent, direction) => {
    if (!swipeMenu.value) return
    const computed = window.getComputedStyle(swipeMenu.value)
    const currentLeft = parseInt(computed.left, 10) || 0
    if ((direction === 'left' || direction === 'right') && Math.abs(currentLeft) > 50) {
      swipeMenu.value.style.transition = 'opacity 0.2s, left 0.2s'
      swipeMenu.value.style.opacity = '0'
      if (direction === 'left') {
        swipeMenu.value.style.left = `-${window.innerWidth}px`
        onDeny()
      } else if (direction === 'right') {
        swipeMenu.value.style.left = `${window.innerWidth}px`
        onAccept()
      }
    } else {
      swipeMenu.value.style.transition = 'left 0.3s'
      swipeMenu.value.style.left = `0px`
    }
  }
})
</script>