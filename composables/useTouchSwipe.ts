// composables/useTouchSwipe.ts
export function useTouchSwipe(
  elementRef: Ref<HTMLElement | null>,
  scrollLeft: () => void,
  scrollRight: () => void
) {
  const startX = ref(0)
  const startY = ref(0)
  const isMoving = ref(false)

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    startX.value = touch.clientX
    startY.value = touch.clientY
    isMoving.value = true
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!isMoving.value || !elementRef.value) return

    const touch = event.touches[0]
    const deltaX = touch.clientX - startX.value
    const deltaY = touch.clientY - startY.value

    // 觸控範圍
    const rect = elementRef.value.getBoundingClientRect()
    const touchX = touch.clientX
    const touchY = touch.clientY

    if (touchX < rect.left || touchX > rect.right || touchY < rect.top || touchY > rect.bottom) {
      // 限制在觸控範圍內
      return
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 30) {
        scrollLeft()
        isMoving.value = false
      } else if (deltaX < -30) {
        scrollRight()
        isMoving.value = false
      }
    }
  }

  const handleTouchEnd = () => {
    isMoving.value = false
  }

  onMounted(() => {
    const element = elementRef.value
    if (element) {
      element.addEventListener('touchstart', handleTouchStart)
      element.addEventListener('touchmove', handleTouchMove)
      element.addEventListener('touchend', handleTouchEnd)
    }
  })

  onUnmounted(() => {
    const element = elementRef.value
    if (element) {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  })
}
