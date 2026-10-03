import { RESTAURANT_INFO } from '../../data/restaurant'

interface FooterProps {
  onBookTable?: () => void
  onOpenMenuPage?: () => void
}

const CURRENT_YEAR = new Date().getFullYear()

export function Footer({ onBookTable, onOpenMenuPage }: FooterProps) {
  const { location, contact, hours, social } = RESTAURANT_INFO

  return (
    <footer className="site-footer" id="contact">
      {/* 1. Strong Closing Invitation / CTA Section */}
      <section className="footer-cta" aria-labelledby="footer-cta-title">
        <div className="footer-cta__bg" aria-hidden="true">
          <img
            src="/images/showcase/space-exterior.jpg"
            alt="The Chef Cafe entrance in Vashi"
            width={1050}
            height={1400}
            loading="lazy"
            decoding="async"
            className="footer-cta__img"
          />
          <div className="footer-cta__overlay" />
        </div>

        <div className="footer-cta__content">
          <p className="eyebrow footer-cta__eyebrow">YOUR TABLE AWAITS</p>
          <h2 id="footer-cta-title" className="footer-cta__title">
            A quiet invitation to visit The&nbsp;Chef&nbsp;Cafe
          </h2>
          <p className="footer-cta__desc">
            Experience multi-cuisine dining, craft cocktails, live music staging, and warm hospitality
            in the heart of Sector 19D, Vashi.
          </p>

          <div className="footer-cta__actions">
            <button
              type="button"
              onClick={onBookTable}
              className="btn btn-primary footer-cta__btn-book"
            >
              <span>BOOK A TABLE</span>
              <span aria-hidden="true" className="btn-arrow">→</span>
            </button>
            <button
              type="button"
              onClick={onOpenMenuPage}
              className="btn btn-outline footer-cta__btn-menu"
            >
              <span>VIEW FULL MENU</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Editorial Multi-Column Business & Brand Section */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand & Social */}
          <div className="footer-col footer-col--brand">
            <div className="footer-brand__lockup">
              <span className="footer-brand__logo-frame">
                <img
                  src="/logo-256.png"
                  alt="The Chef Cafe logo"
                  className="footer-brand__logo-img"
                  width={46}
                  height={46}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div>
                <h3 className="footer-brand__name">{RESTAURANT_INFO.name}</h3>
                <p className="footer-brand__tagline">{RESTAURANT_INFO.tagline}</p>
              </div>
            </div>
            <p className="footer-brand__bio">
              A culinary destination in Sector 19D, Vashi, bringing together clay-oven tandoor,
              Indo-Chinese wok dishes, slow-cooked biryanis, and an energetic lounge bar.
            </p>

            <div className="footer-social">
              <span className="footer-col__label">Connect</span>
              <div className="footer-social__links">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="The Chef Cafe on Instagram"
                >
                  <span>Instagram</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="The Chef Cafe on Facebook"
                >
                  <span>Facebook</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col footer-col--nav">
            <h4 className="footer-col__heading">Quick Navigation</h4>
            <ul className="footer-nav__list">
              <li>
                <button
                  type="button"
                  onClick={onOpenMenuPage}
                  className="footer-link footer-link--btn"
                >
                  Culinary Menu & Tariff
                </button>
              </li>
              <li>
                <a href="#story" className="footer-link">
                  Our Culinary Story
                </a>
              </li>
              <li>
                <a href="#space" className="footer-link">
                  The Space & Ambience
                </a>
              </li>
              <li>
                <a href="#location" className="footer-link">
                  Live Map & Directions
                </a>
              </li>
              <li>
                <a href="#faq" className="footer-link">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBookTable}
                  className="footer-link footer-link--btn"
                >
                  Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Hours */}
          <div className="footer-col footer-col--location">
            <h4 className="footer-col__heading">Location & Arrival</h4>
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-address-link"
              title="Open The Chef Cafe on Google Maps"
            >
              <address className="footer-address">
                {location.formattedAddress.map((line, idx) => (
                  <span key={idx} className="footer-address__line">
                    {line}
                  </span>
                ))}
              </address>
              <span className="footer-maps-badge">
                <span>View on Google Maps</span>
                <span aria-hidden="true">↗</span>
              </span>
            </a>

            <div className="footer-hours">
              <h5 className="footer-hours__subheading">Dining & Lounge Hours</h5>
              <div className="footer-hours__rows">
                <div className="footer-hours__row">
                  <span className="footer-hours__day">Lunch</span>
                  <span className="footer-hours__time">{hours.lunch}</span>
                </div>
                <div className="footer-hours__row">
                  <span className="footer-hours__day">Dinner</span>
                  <span className="footer-hours__time">{hours.dinner}</span>
                </div>
                <div className="footer-hours__row">
                  <span className="footer-hours__day">Days</span>
                  <span className="footer-hours__time">{hours.days}</span>
                </div>
              </div>
              <p className="footer-hours__badge">
                * {hours.note}
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Immediate Triggers */}
          <div className="footer-col footer-col--contact">
            <h4 className="footer-col__heading">Contact & Reservations</h4>
            <div className="footer-contact__items">
              <div className="footer-contact__item">
                <span className="footer-contact__label">Phone / Booking Line</span>
                <a href={`tel:${contact.phoneCallable}`} className="footer-contact__link">
                  📞 {contact.phoneDisplay}
                </a>
              </div>
              <div className="footer-contact__item">
                <span className="footer-contact__label">WhatsApp Inquiries</span>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact__link footer-contact__link--wa"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
              <div className="footer-contact__item">
                <span className="footer-contact__label">Email</span>
                <a href={`mailto:${contact.email}`} className="footer-contact__link">
                  ✉️ {contact.email}
                </a>
              </div>
            </div>

            <div className="footer-reservation-shortcut">
              <button
                type="button"
                onClick={onBookTable}
                className="btn btn-outline footer-quick-reserve-btn"
              >
                Instant Online Reservation
              </button>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Continuity Strip */}
        <div className="footer-bottom">
          <div className="footer-bottom__inner">
            <p className="footer-bottom__copy">
              © {CURRENT_YEAR} The Chef Cafe. All rights reserved.
            </p>
            <p className="footer-bottom__signoff">
              Spire Tower, Sector 19D, Vashi • Navi Mumbai
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}