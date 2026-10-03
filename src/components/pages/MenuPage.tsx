import { useState, useMemo, useEffect } from 'react'
import { fullMenu, officialMenuScans, type MenuItem, type MenuScan } from '../../data/menu'

interface MenuPageProps {
  isOpen: boolean
  onClose: () => void
  onBookTable: (dishName?: string) => void
}

type CategoryType =
  | 'all'
  | 'starters'
  | 'chinese'
  | 'mains'
  | 'biryani'
  | 'pizza-pasta'
  | 'beverages'
  | 'desserts'
  | 'bar'
  | 'scans'

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Dishes' },
  { id: 'starters', label: 'Tandoor & Kebabs' },
  { id: 'chinese', label: 'Indo-Chinese Wok' },
  { id: 'mains', label: 'Mains & Gravies' },
  { id: 'biryani', label: 'Dum Biryanis' },
  { id: 'pizza-pasta', label: 'Pizzas & Pastas' },
  { id: 'beverages', label: 'Craft Coolers & Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'bar', label: 'Lounge Bar Tariff' },
  { id: 'scans', label: '📄 Original Menu Scans' },
]

export function MenuPage({ isOpen, onClose, onBookTable }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all')
  const [activeScanModal, setActiveScanModal] = useState<MenuScan | null>(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeScanModal) {
          setActiveScanModal(null)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeScanModal, onClose])

  // Prevent background scrolling while MenuPage is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isOpen])

  // Filtered menu items
  const filteredDishes = useMemo(() => {
    if (activeCategory === 'scans') return []

    return fullMenu.filter((item: MenuItem) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false
      if (dietFilter === 'nonveg' && item.isVeg) return false

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = item.name.toLowerCase().includes(query)
        const matchDesc = item.description.toLowerCase().includes(query)
        const matchTag = item.tag.toLowerCase().includes(query)
        return matchName || matchDesc || matchTag
      }

      return true
    })
  }, [activeCategory, dietFilter, searchQuery])

  const handleCategoryClick = (catId: CategoryType, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveCategory(catId)
    e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  if (!isOpen) return null

  return (
    <div
      className="menu-page-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="The Chef Cafe Complete Menu"
    >
      {/* Top sticky navigation bar */}
      <header className="menu-page__header">
        <div className="menu-page__header-inner">
          <button
            type="button"
            onClick={onClose}
            className="menu-page__back-btn"
            aria-label="Back to restaurant website"
          >
            <span aria-hidden="true" className="menu-page__back-arrow">←</span>
            <span className="menu-page__back-text">Back</span>
          </button>

          <div className="menu-page__header-brand">
            <span className="menu-page__brand-logo-frame">
              <img
                src="/logo-256.png"
                alt="The Chef Cafe logo"
                className="menu-page__brand-logo-img"
                width={34}
                height={34}
                loading="eager"
                decoding="async"
              />
            </span>
            <div className="menu-page__brand-text-wrap">
              <h1 className="menu-page__title">The Chef Cafe</h1>
              <p className="menu-page__subtitle">
                Sector 19D, Vashi • Multi-Cuisine Dining & Bar
              </p>
            </div>
          </div>

          <div className="menu-page__header-actions">
            <button
              type="button"
              onClick={() => {
                onClose()
                onBookTable()
              }}
              className="btn btn-primary menu-page__book-btn"
            >
              Book Table
            </button>
            <button
              type="button"
              onClick={onClose}
              className="menu-page__close-btn"
              aria-label="Close menu view"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Main scrollable body */}
      <main className="menu-page__main">
        {/* Streamlined Menu Header */}
        <section className="menu-page__hero">
          <div className="menu-page__hero-content">
            <span className="eyebrow">RESTAURANT MENU & TARIFF</span>
            <h2 className="menu-page__hero-title">Culinary Selections & Bar</h2>
            <p className="menu-page__hero-desc">
              Authentic clay-oven tandoor kebabs, fiery Indo-Chinese wok specialties, slow-cooked dum biryanis,
              pizzas, hand-muddled craft coolers, and bar tariff in Sector 19D, Vashi.
            </p>
          </div>
        </section>

        {/* Immediate Controls: Search + Diet Toggle + Category Tabs */}
        <div className="menu-page__controls-bar">
          <div className="menu-page__search-row">
            <div className="menu-page__search-wrap">
              <span className="menu-page__search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search dishes or drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="menu-page__search-input"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="menu-page__search-clear"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Diet filter pills */}
            <div className="menu-page__diet-filters" role="group" aria-label="Dietary preference">
              <button
                type="button"
                className={`diet-pill ${dietFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setDietFilter('all')}
              >
                All Diets
              </button>
              <button
                type="button"
                className={`diet-pill diet-pill--veg ${dietFilter === 'veg' ? 'is-active' : ''}`}
                onClick={() => setDietFilter('veg')}
              >
                <span className="diet-dot veg-dot" /> Veg Only
              </button>
              <button
                type="button"
                className={`diet-pill diet-pill--nonveg ${dietFilter === 'nonveg' ? 'is-active' : ''}`}
                onClick={() => setDietFilter('nonveg')}
              >
                <span className="diet-dot nonveg-dot" /> Non-Veg
              </button>
            </div>
          </div>

          {/* Category Tabs with horizontal scroll affordance */}
          <nav className="menu-page__categories" aria-label="Menu categories">
            <div className="menu-page__categories-track">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`menu-page__category-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                  onClick={(e) => handleCategoryClick(cat.id, e)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Section: Either Scans or Dishes */}
        {activeCategory === 'scans' ? (
          <section className="menu-page__scans-section">
            <div className="menu-page__scans-intro">
              <h3 className="menu-page__section-title">Official Printed Menu Scans</h3>
              <p className="menu-page__section-desc">
                Original printed restaurant menu cards and bar tariff of The Chef Cafe, Vashi.
                Click on any page to open a high-resolution viewer.
              </p>
            </div>

            <div className="menu-page__scans-grid">
              {officialMenuScans.map((scan: MenuScan) => (
                <article
                  key={scan.id}
                  className="menu-scan-card"
                  onClick={() => setActiveScanModal(scan)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveScanModal(scan)
                    }
                  }}
                  aria-label={`View scan: ${scan.title}`}
                >
                  <div className="menu-scan-card__thumb-frame">
                    <img
                      src={scan.image}
                      alt={scan.title}
                      loading="lazy"
                      className="menu-scan-card__img"
                    />
                    <div className="menu-scan-card__overlay">
                      <span className="menu-scan-card__zoom-badge">🔍 Click to Expand</span>
                    </div>
                  </div>
                  <div className="menu-scan-card__meta">
                    <h4 className="menu-scan-card__title">{scan.title}</h4>
                    <p className="menu-scan-card__sub">{scan.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="menu-page__dishes-section">
            <div className="menu-page__dishes-meta">
              <span className="menu-page__results-count">
                Showing <strong>{filteredDishes.length}</strong> {filteredDishes.length === 1 ? 'dish' : 'dishes'}
                {dietFilter !== 'all' ? ` (${dietFilter === 'veg' ? 'Veg Only' : 'Non-Veg'})` : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </span>
              <button
                type="button"
                onClick={() => setActiveCategory('scans')}
                className="btn-text menu-page__view-scans-link"
              >
                📄 View Printed Menu Scans →
              </button>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="menu-page__empty-state">
                <p className="menu-page__empty-icon">🍽️</p>
                <h4>No dishes found matching your selection</h4>
                <p>Try clearing your search term or switching the dietary preference.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setDietFilter('all')
                    setActiveCategory('all')
                  }}
                  className="btn btn-outline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="menu-page__dishes-grid">
                {filteredDishes.map((dish: MenuItem) => (
                  <article
                    key={dish.id}
                    className={`dish-card${dish.image ? ' has-image' : ' text-only'}`}
                  >
                    {dish.image && (
                      <div className="dish-card__image-container">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          loading="lazy"
                          decoding="async"
                          className="dish-card__photo"
                        />
                      </div>
                    )}
                    <div className="dish-card__content">
                      <div className="dish-card__top">
                        <div className="dish-card__identity">
                          <span
                            className={`dish-card__diet ${dish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                            title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                            aria-label={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span className="dot" />
                          </span>
                          <span className="dish-card__category-label">{dish.tag}</span>
                        </div>
                        <span className="dish-card__price">₹{dish.price}</span>
                      </div>

                      <h4 className="dish-card__name">{dish.name}</h4>
                      <p className="dish-card__desc">{dish.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section-Level Booking Invitation */}
        <footer className="menu-page__footer">
          <div className="menu-page__footer-card">
            <h4>Ready to experience The Chef Cafe?</h4>
            <p>
              Join us in Sector 19D, Vashi for multi-cuisine dining, craft coolers, bar service, and celebrations.
              Reservations are held for 15 minutes.
            </p>
            <div className="menu-page__footer-ctas">
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onBookTable()
                }}
                className="btn btn-primary"
              >
                Book a table
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Back to Website
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Lightbox Modal for Full Menu Scan Viewing */}
      {activeScanModal && (
        <div
          className="scan-lightbox-overlay"
          onClick={() => setActiveScanModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeScanModal.title}
        >
          <div
            className="scan-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="scan-lightbox__header">
              <div>
                <h4 className="scan-lightbox__title">{activeScanModal.title}</h4>
                <p className="scan-lightbox__sub">{activeScanModal.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveScanModal(null)}
                className="scan-lightbox__close"
                aria-label="Close high resolution scan viewer"
              >
                ✕
              </button>
            </header>
            <div className="scan-lightbox__image-wrap">
              <img
                src={activeScanModal.image}
                alt={activeScanModal.title}
                className="scan-lightbox__img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
