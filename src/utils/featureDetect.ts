export type Capability = 'webgl' | 'reduced-motion' | 'mobile' | 'low-end'

export interface Capabilities {
  webgl: boolean
  reducedMotion: boolean
  mobile: boolean
  lowEnd: boolean
  viewportWidth: number
  viewportHeight: number
  devicePixelRatio: number
  hardwareConcurrency: number | null
  deviceMemory: number | null
  maxTouchPoints: number
  isSmallViewport: boolean
  isConstrainedHardware: boolean
}

let cachedWebGL: boolean | null = null

/**
 * Safely tests for WebGL / WebGL2 capability without leaking GPU contexts.
 * Caches the result on initial probe to avoid repeatedly creating canvas elements.
 */
export function probeWebGL(): boolean {
  if (cachedWebGL !== null) return cachedWebGL

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    cachedWebGL = false
    return false
  }

  try {
    const canvas = document.createElement('canvas')
    // Probe WebGL 2 first, then WebGL 1
    const gl = (
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    ) as (WebGLRenderingContext | WebGL2RenderingContext | null)

    if (!gl || typeof gl.getParameter !== 'function') {
      cachedWebGL = false
      return false
    }

    if (typeof gl.isContextLost === 'function' && gl.isContextLost()) {
      cachedWebGL = false
      return false
    }

    // Release context if extension is available to prevent resource holding
    const loseExt = gl.getExtension('WEBGL_lose_context')
    if (loseExt) {
      loseExt.loseContext()
    }

    cachedWebGL = true
    return true
  } catch {
    cachedWebGL = false
    return false
  }
}

/**
 * Reset cached WebGL probe (primarily for unit / automated testing).
 */
export function resetWebGLCache(): void {
  cachedWebGL = null
}

/**
 * Probes the browser once for the capabilities the cinematic layer needs.
 * The result decides which experience renders:
 *   - FULL_CINEMATIC (desktop 3D Three.js curtain + camera sequence)
 *   - LIGHTWEIGHT (2D / 2.5D fallback for mobile & constrained devices)
 *   - REDUCED_MOTION (static, non-animated accessible path)
 */
export function detectCapabilities(): Capabilities {
  const isBrowser = typeof window !== 'undefined'

  const reducedMotion =
    isBrowser &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const viewportWidth = isBrowser ? window.innerWidth : 1200
  const viewportHeight = isBrowser ? window.innerHeight : 800
  const devicePixelRatio = isBrowser ? (window.devicePixelRatio || 1) : 1

  const nav = isBrowser && typeof navigator !== 'undefined' ? navigator : null
  const hardwareConcurrency = nav && typeof nav.hardwareConcurrency === 'number'
    ? nav.hardwareConcurrency
    : null

  // deviceMemory is an experimental Chrome/Edge property (GB)
  const navAny = nav as { deviceMemory?: number } | null
  const deviceMemory = navAny && typeof navAny.deviceMemory === 'number'
    ? navAny.deviceMemory
    : null

  const maxTouchPoints = nav && typeof nav.maxTouchPoints === 'number'
    ? nav.maxTouchPoints
    : 0

  const webgl = probeWebGL()

  // Small viewport: phone / narrow screen form-factor (< 768px)
  const isSmallViewport = viewportWidth < 768

  // Constrained hardware: strictly <= 2 CPU cores or <= 2GB memory
  // Avoids falsely penalizing capable high-DPR or touch laptops
  const isConstrainedHardware =
    (hardwareConcurrency !== null && hardwareConcurrency <= 2) ||
    (deviceMemory !== null && deviceMemory <= 2)

  // Combined mobile & low-end flags for backward compatibility
  const mobile = isSmallViewport || (maxTouchPoints > 0 && viewportWidth < 900)
  const lowEnd = isConstrainedHardware || !webgl

  return {
    webgl,
    reducedMotion,
    mobile,
    lowEnd,
    viewportWidth,
    viewportHeight,
    devicePixelRatio,
    hardwareConcurrency,
    deviceMemory,
    maxTouchPoints,
    isSmallViewport,
    isConstrainedHardware,
  }
}