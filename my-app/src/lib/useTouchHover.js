import { useEffect, useRef, useState } from 'react'

const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

// 터치 기기에서 호버 효과를 볼 수 있도록:
// 첫 탭은 이동을 막고 호버 효과(.touch-hover)만 보여주고, 같은 요소를 다시 탭하면 실제로 이동한다.
// 데스크톱(마우스)에서는 아무 것도 하지 않는다.
export function useTouchHover(resetMs = 3500) {
  const [hoverKey, setHoverKey] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const guardTap = (key) => (event) => {
    if (!isTouchDevice() || hoverKey === key) return

    event.preventDefault()
    setHoverKey(key)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setHoverKey(null), resetMs)
  }

  const touchHoverClass = (key) => (hoverKey === key ? 'touch-hover' : '')

  return { hoverKey, guardTap, touchHoverClass }
}
