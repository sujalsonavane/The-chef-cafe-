import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MenuSection } from '../sections/MenuSection'
import { StorySection } from '../sections/StorySection'
import { SpaceSection } from '../sections/SpaceSection'
import { MapSection } from '../sections/MapSection'
import { FaqSection } from '../sections/FaqSection'
import { ReservationsSection } from '../sections/ReservationsSection'

gsap.registerPlugin(ScrollTrigger)

interface MainContentProps {
  onBookTable?: (dishName?: string) => void
  onOpenFullMenu?: () => void
}

/**
 * The core content of The Chef Cafe website.
 * Smoothly animated with GSAP ScrollTrigger (once: true) to eliminate scroll stutter and jank.
 */
export function MainContent({ onBookTable, onOpenFullMenu }: MainContentProps) {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mainEl = mainRef.current
    if (!mainEl) return

    const ctx = gsap.context(() => {
      // 1. Smooth entrance reveal for section headers
      const sections = mainEl.querySelectorAll<HTMLElement>('.content-section')
      sections.forEach((section) => {
        const eyebrow = section.querySelector('.eyebrow')
        const title = section.querySelector('.section-title')
        const lede = section.querySelector('.section-lede')
        const targets = [eyebrow, title, lede].filter(Boolean)

        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            {
              opacity: 0,
              y: 24,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                once: true,
              },
            }
          )
        }
      })

      // 2. Smooth reveal for Kitchen Editorial Cards
      const kitchenCards = mainEl.querySelectorAll<HTMLElement>(
        '.kitchen-editorial__feature, .kitchen-sub-card'
      )
      if (kitchenCards.length > 0) {
        gsap.fromTo(
          kitchenCards,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.kitchen-editorial',
              start: 'top 88%',
              once: true,
            },
          }
        )
      }

      // 3. Smooth reveal for interactive showcase cards & map
      const showcases = mainEl.querySelectorAll<HTMLElement>(
        '.story-showcase, .space-gallery__card, .map-showcase, .faq-accordion, .reservations-wrapper'
      )
      showcases.forEach((showcase) => {
        gsap.fromTo(
          showcase,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showcase,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })
    }, mainEl)

    return () => ctx.revert()
  }, [])

  return (
    <main id="top" ref={mainRef} className="main-content">
      <StorySection />
      <MenuSection onSelectItem={onBookTable} onOpenFullMenu={onOpenFullMenu} />
      <SpaceSection />
      <MapSection onBookTable={() => onBookTable?.()} />
      <FaqSection onBookTable={() => onBookTable?.()} />
      <ReservationsSection onBookTable={() => onBookTable?.()} />
    </main>
  )
}