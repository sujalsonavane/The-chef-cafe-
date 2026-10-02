import { useEffect, useState } from 'react'

/**
 * Tracks vertical scroll position in pixels.
 * Lightweight alternative to a full scroll library — used by the header
 * to switch between transparent and frosted states.
 */
export function useScrollPosition(): number {
  const [y, setY] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return y
}