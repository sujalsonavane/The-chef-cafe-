import { useEffect, useState } from 'react'

/**
 * Returns true while the media query matches.
 * Stable across SSR (defaults to false) and re-evaluates on resize.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    // Synchronize with the external matchMedia system; suppress the lint
    // warning — this is the intended pattern for media queries.
    // eslint-disable-next-line react/set-state-in-effect
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}