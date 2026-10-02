import { useState, useEffect } from 'react'
import { SiteShell } from './components/layout/SiteShell'
import { CinematicStage } from './components/cinematic/CinematicStage'
import { MainContent } from './components/content/MainContent'
import { ReservationModal } from './components/ui/ReservationModal'
import { MenuPage } from './components/pages/MenuPage'

/**
 * Single root component. It never owns scene logic — that lives in
 * src/scenes/desktop/ and is injected through <CinematicStage/>.
 * Manages full MenuPage view and table reservation state.
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState<string | undefined>()
  const [menuPageOpen, setMenuPageOpen] = useState(false)

  // Listen to hash changes (e.g. #menu-page or #full-menu)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#menu-page' || hash === '#full-menu') {
        setMenuPageOpen(true)
      } else if (menuPageOpen && hash !== '#menu-page' && hash !== '#full-menu') {
        setMenuPageOpen(false)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [menuPageOpen])

  const handleBookTable = (dishName?: string) => {
    setSelectedDish(dishName)
    setModalOpen(true)
  }

  const handleOpenMenu = () => {
    setMenuPageOpen(true)
    window.location.hash = 'menu-page'
  }

  const handleCloseMenu = () => {
    setMenuPageOpen(false)
    if (window.location.hash === '#menu-page' || window.location.hash === '#full-menu') {
      history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <>
      <SiteShell
        cinematic={<CinematicStage />}
        onBookTable={() => handleBookTable()}
        onOpenMenuPage={handleOpenMenu}
      >
        <MainContent
          onBookTable={handleBookTable}
          onOpenFullMenu={handleOpenMenu}
        />
      </SiteShell>

      <MenuPage
        isOpen={menuPageOpen}
        onClose={handleCloseMenu}
        onBookTable={handleBookTable}
      />

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        dishName={selectedDish}
      />
    </>
  )
}