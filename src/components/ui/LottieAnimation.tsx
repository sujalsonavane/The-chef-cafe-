import { useEffect, useRef, useState } from 'react'

interface LottieAnimationProps {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  playOnHover?: boolean
  ariaLabel?: string
  width?: number | string
  height?: number | string
}

export function LottieAnimation({
  src,
  className = '',
  loop = true,
  autoplay = true,
  playOnHover = false,
  ariaLabel,
  width,
  height,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  // IntersectionObserver to only load & animate when near viewport
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (animRef.current && (autoplay || !playOnHover)) {
            animRef.current.play()
          }
        } else {
          if (animRef.current) {
            animRef.current.pause()
          }
        }
      },
      { rootMargin: '100px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [autoplay, playOnHover])

  // Load Lottie runtime and animation JSON dynamically
  useEffect(() => {
    if (!isVisible || !containerRef.current) return
    let isCancelled = false

    Promise.all([
      // @ts-expect-error - lottie_light subpath has no ambient declaration file
      import('lottie-web/build/player/lottie_light.min.js'),
      fetch(src).then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${src}`)
        return res.json()
      }),
    ])
      .then(([lottieModule, animationData]) => {
        if (isCancelled || !containerRef.current) return

        // lottieModule might be default export or commonjs
        const lottie = (lottieModule as any).default || lottieModule

        if (animRef.current) {
          animRef.current.destroy()
        }

        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: playOnHover ? false : loop,
          autoplay: playOnHover ? false : autoplay,
          animationData,
        })

        animRef.current = anim
      })
      .catch((err) => {
        console.warn('Lottie failed to load:', src, err)
      })

    return () => {
      isCancelled = true
      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }
    }
  }, [isVisible, src, loop, autoplay, playOnHover])

  const handleMouseEnter = () => {
    if (playOnHover && animRef.current) {
      animRef.current.goToAndPlay(0)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`lottie-container ${className}`.trim()}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={handleMouseEnter}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  )
}
