import { featuredKitchenDishes } from '../../data/menu'
import { LottieAnimation } from '../ui/LottieAnimation'

interface MenuSectionProps {
  onSelectItem?: (dishName?: string) => void
  onOpenFullMenu?: () => void
}

export function MenuSection({ onSelectItem, onOpenFullMenu }: MenuSectionProps) {
  const heroDish = featuredKitchenDishes.find((d) => d.isHero) || featuredKitchenDishes[0]
  const supportingDishes = featuredKitchenDishes.filter((d) => !d.isHero)

  const handleDishClick = (dishName: string) => {
    // Navigate to full menu or allow quick discovery
    if (onOpenFullMenu) {
      onOpenFullMenu()
    } else if (onSelectItem) {
      onSelectItem(dishName)
    }
  }

  return (
    <section id="menu" className="content-section kitchen-section">
      <div className="section-header-wrap">
        <p className="eyebrow">FROM THE KITCHEN</p>
        <h2 className="section-title">A taste of The Chef Cafe</h2>
        <p className="section-lede">
          Every plate is prepared to order using hand-ground spices, clay-oven tandoor craft, and fresh ingredients.
        </p>
      </div>

      {/* Editorial Food Composition */}
      <div className="kitchen-editorial">
        {/* Large Dominant Feature */}
        <article
          className="kitchen-editorial__feature"
          onClick={() => handleDishClick(heroDish.name)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleDishClick(heroDish.name)
            }
          }}
          aria-label={`Explore ${heroDish.name}`}
        >
          <div className="kitchen-editorial__feature-media">
            <img
              src={heroDish.image}
              alt={heroDish.name}
              loading="lazy"
              decoding="async"
              className="kitchen-editorial__feature-img"
            />
            <div className="kitchen-editorial__feature-overlay" aria-hidden="true" />
            <div className="kitchen-editorial__meta-badge">
              <span className="kitchen-editorial__category">{heroDish.categoryLabel}</span>
              <span
                className={`kitchen-diet-dot ${heroDish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                title={heroDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                aria-label={heroDish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <span className="dot" />
              </span>
            </div>
          </div>

          <div className="kitchen-editorial__feature-body">
            <div className="kitchen-editorial__feature-head">
              <h3 className="kitchen-editorial__feature-title">{heroDish.name}</h3>
              <span className="kitchen-editorial__feature-price">₹{heroDish.price}</span>
            </div>
            <p className="kitchen-editorial__feature-desc">{heroDish.description}</p>
          </div>
        </article>

        {/* Supporting Editorial Dishes Stack */}
        <div className="kitchen-editorial__stack">
          {supportingDishes.map((dish) => (
            <article
              key={dish.id}
              className="kitchen-sub-card"
              onClick={() => handleDishClick(dish.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleDishClick(dish.name)
                }
              }}
              aria-label={`Explore ${dish.name}`}
            >
              <div className="kitchen-sub-card__media">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  decoding="async"
                  className="kitchen-sub-card__img"
                />
                <span
                  className={`kitchen-diet-dot kitchen-diet-dot--corner ${dish.isVeg ? 'is-veg' : 'is-nonveg'}`}
                  title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  aria-label={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                >
                  <span className="dot" />
                </span>
              </div>

              <div className="kitchen-sub-card__body">
                <div className="kitchen-sub-card__category">{dish.categoryLabel}</div>
                <div className="kitchen-sub-card__head">
                  <h4 className="kitchen-sub-card__title">{dish.name}</h4>
                  <span className="kitchen-sub-card__price">₹{dish.price}</span>
                </div>
                <p className="kitchen-sub-card__desc">{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Primary Section CTA: View Full Menu */}
      <div className="kitchen-cta-wrap">
        <LottieAnimation
          src="/animations/burger-stack.json"
          width={130}
          height={96}
          className="kitchen-cta-lottie"
          ariaLabel="Explore gourmet kitchen selection"
        />
        <p className="kitchen-cta-caption">
          Explore our complete selection of clay-oven tandoor, wok specialties, dum biryanis, craft coolers & spirits.
        </p>
        <button
          type="button"
          onClick={onOpenFullMenu}
          className="btn btn-outline kitchen-cta-btn"
          aria-label="View complete restaurant menu"
        >
          <span>VIEW FULL MENU</span>
          <span aria-hidden="true" className="btn-arrow">→</span>
        </button>
      </div>
    </section>
  )
}