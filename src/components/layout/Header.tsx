import { useState, useEffect } from 'react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { getExperience } from '../../utils/experience'

interface HeaderProps {
  onBookTable?: () => void
  onOpenMenuPage?: () => void
}

/**
 * Site Header with responsive desktop and mobile navigation.
 * - Mobile: Features an accessible hamburger drawer with full navigation, direct call, WhatsApp, and booking triggers.
 * - Desktop: Streamlined header with smooth section navigation and primary CTA.
 */
export function Header({ onBookTable, onOpenMenuPage }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const scrollY = useScrollPosition()
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const experience = getExperience()

  // The 650vh pinned track is only present for FULL_CINEMATIC
  const isCinematic = experience === 'FULL_CINEMATIC' && scrollY < viewportHeight * 3.2
  const isScrolled = scrollY > 20

  // Close drawer on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isDrawerOpen])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isDrawerOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setIsDrawerOpen(false)
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
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

        {/* Desktop Navigation Links */}
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
          <a href="#location" onClick={(e) => handleNavClick(e, 'location')}>
            Map & Arrival
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
            FAQ
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className={`mobile-menu-btn${isDrawerOpen ? ' is-active' : ''}`}
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          aria-label={isDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isDrawerOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden={!isDrawerOpen}
        >
          <div
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer__header">
              <div className="mobile-drawer__brand">
                <span className="brand-logo-frame">
                  <img
                    src="/logo-256.png"
                    alt="The Chef Cafe crest"
                    width={34}
                    height={34}
                    className="brand-logo-img"
                  />
                </span>
                <span className="brand-text">The Chef Cafe</span>
              </div>
              <button
                type="button"
                className="mobile-drawer__close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu drawer"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer__nav">
              <a
                href="#menu"
                onClick={(e) => {
                  setIsDrawerOpen(false)
                  if (onOpenMenuPage) {
                    e.preventDefault()
                    onOpenMenuPage()
                  } else {
                    handleNavClick(e, 'menu')
                  }
                }}
              >
                <span className="drawer-nav-num">01</span>
                <span>Explore Menu</span>
              </a>
              <a href="#story" onClick={(e) => handleNavClick(e, 'story')}>
                <span className="drawer-nav-num">02</span>
                <span>Our Story</span>
              </a>
              <a href="#space" onClick={(e) => handleNavClick(e, 'space')}>
                <span className="drawer-nav-num">03</span>
                <span>The Space & Ambience</span>
              </a>
              <a href="#location" onClick={(e) => handleNavClick(e, 'location')}>
                <span className="drawer-nav-num">04</span>
                <span>Live Google Map & Directions</span>
              </a>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
                <span className="drawer-nav-num">05</span>
                <span>FAQ</span>
              </a>
              <a href="#reservations" onClick={(e) => handleNavClick(e, 'reservations')}>
                <span className="drawer-nav-num">06</span>
                <span>Table Reservation</span>
              </a>
            </nav>

            <div className="mobile-drawer__footer">
              <button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false)
                  onBookTable?.()
                }}
                className="btn btn-primary mobile-drawer__book-btn"
              >
                Reserve a Table
              </button>

              <div className="mobile-drawer__contact-shortcuts">
                <a href="tel:+919820012345" className="drawer-quick-contact">
                  📞 Call: +91 98200 12345
                </a>
                <a
                  href="https://wa.me/919820012345?text=Hi%20The%20Chef%20Cafe%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-quick-contact drawer-quick-contact--wa"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}