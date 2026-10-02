import { useScrollPosition } from '../../hooks/useScrollPosition'
import { getExperience } from '../../utils/experience'

interface HeaderProps {
  onBookTable?: () => void
  onOpenMenuPage?: () => void
}

/**
 * Site Header supporting Option B:
 * - During the cinematic intro: Displays only a very minimal brand mark (no full navigation),
 *   allowing the centered brand title and red curtain to dominate without visual clutter.
 * - After unpinning/exiting the cinematic section: Restores the full site navigation and CTA smoothly.
 * - For lightweight and reduced-motion experiences: Navigation is available immediately.
 * - Clicking "Menu" opens the comprehensive full-menu collection or navigates to the menu section.
 */
export function Header({ onBookTable, onOpenMenuPage }: HeaderProps) {
  const scrollY = useScrollPosition()
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const experience = getExperience()

  // The 650vh pinned track is only present for FULL_CINEMATIC
  const isCinematic = experience === 'FULL_CINEMATIC' && scrollY < viewportHeight * 5.3
  const isScrolled = scrollY > 24

  return (
    <header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}${isCinematic ? ' is-cinematic' : ' is-full-nav'}`}
      role="banner"
    >
      <a href="#top" className="brand" aria-label="The Chef Cafe — home">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-text">The Chef Cafe</span>
      </a>

      <nav className="site-nav" aria-label="Primary" aria-hidden={isCinematic}>
        <a
          href="#menu"
          onClick={(e) => {
            if (onOpenMenuPage) {
              e.preventDefault()
              onOpenMenuPage()
            }
          }}
          tabIndex={isCinematic ? -1 : 0}
        >
          Menu
        </a>
        <a href="#story" tabIndex={isCinematic ? -1 : 0}>Story</a>
        <a href="#space" tabIndex={isCinematic ? -1 : 0}>Space</a>
        <a href="#reservations" tabIndex={isCinematic ? -1 : 0}>Reservations</a>
        <button
          type="button"
          onClick={onBookTable}
          className="nav-cta"
          tabIndex={isCinematic ? -1 : 0}
        >
          Book a table
        </button>
      </nav>
    </header>
  )
}