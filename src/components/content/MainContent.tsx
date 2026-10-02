import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MenuSection } from '../sections/MenuSection'
import { StorySection } from '../sections/StorySection'
import { SpaceSection } from '../sections/SpaceSection'
import { ReservationsSection } from '../sections/ReservationsSection'

gsap.registerPlugin(ScrollTrigger)

interface MainContentProps {
  onBookTable?: (dishName?: string) => void
  onOpenFullMenu?: () => void
}

/**
 * The non-cinematic body of the site.
 * Enhanced with GSAP ScrollTrigger pop-up animations on sections,
 * headings, and interactive menu cards.
 */
export function MainContent({ onBookTable, onOpenFullMenu }: MainContentProps) {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mainEl = mainRef.current
    if (!mainEl) return

    const ctx = gsap.context(() => {
      // 1. Pop-up reveal for section headers (eyebrow, title, lede)
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
              y: 32,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })

      // 2. Pop-up spring animation for Kitchen Editorial Cards
      const kitchenCards = mainEl.querySelectorAll<HTMLElement>(
        '.kitchen-editorial__feature, .kitchen-sub-card'
      )
      if (kitchenCards.length > 0) {
        gsap.fromTo(
          kitchenCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: '.kitchen-editorial',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 3. Pop-up button animation in Reservations section
      const resBtn = mainEl.querySelector<HTMLElement>('#reservations .btn')
      if (resBtn) {
        gsap.fromTo(
          resBtn,
          {
            opacity: 0,
            scale: 0.82,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: '#reservations',
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // 4. Subtle pop-up reveal for photographic showcases
      const photoShowcases = mainEl.querySelectorAll<HTMLElement>(
        '.story-showcase, .space-gallery__card, .reservations-wrapper'
      )
      photoShowcases.forEach((showcase) => {
        gsap.fromTo(
          showcase,
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showcase,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
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
      <ReservationsSection onBookTable={() => onBookTable?.()} />
    </main>
  )
}