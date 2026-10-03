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
  const isCinematic = experience === 'FULL_CINEMATIC' && scrollY < viewportHeight * 5.2
  const isScrolled = scrollY > 24

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}${isCinematic ? ' is-cinematic' : ' is-full-nav'}`}
      role="banner"
    >
      <a
        href="#top"
        className="brand"
        aria-label="The Chef Cafe — home"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      >
        <span className="brand-logo-frame">
          <img
            src="/logo-256.png"
            alt="The Chef Cafe logo"
            className="brand-logo-img"
            width={38}
            height={38}
            loading="eager"
            decoding="async"
          />
        </span>
        <span className="brand-text">The Chef Cafe</span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        <a
          href="#menu"
          onClick={(e) => {
            if (onOpenMenuPage) {
              e.preventDefault()
              onOpenMenuPage()
            } else {
              handleNavClick(e, 'menu')
            }
          }}
        >
          Menu
        </a>
        <a href="#story" onClick={(e) => handleNavClick(e, 'story')}>
          Story
        </a>
        <a href="#space" onClick={(e) => handleNavClick(e, 'space')}>
          Space
        </a>
        <a href="#reservations" onClick={(e) => handleNavClick(e, 'reservations')}>
          Reservations
        </a>
        <button
          type="button"
          onClick={onBookTable}
          className="nav-cta"
        >
          Book a table
        </button>
      </nav>
    </header>
  )
}