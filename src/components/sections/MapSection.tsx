import { RESTAURANT_INFO } from '../../data/restaurant'

interface MapSectionProps {
  onBookTable?: () => void
}

export function MapSection({ onBookTable }: MapSectionProps) {
  const { location, hours, contact } = RESTAURANT_INFO

  return (
    <section id="location" className="content-section map-section" aria-labelledby="map-section-title">
      <div className="section-header text-center">
        <p className="eyebrow">LOCATION & ARRIVAL</p>
        <h2 id="map-section-title" className="section-title">Find Us in Sector 19D, Vashi</h2>
        <p className="section-lede">
          Conveniently located at Spire Tower with dedicated valet parking, just minutes from Palm Beach Road and Vashi Station.
        </p>
      </div>

      <div className="map-showcase">
        {/* Interactive Google Map Frame */}
        <div className="map-frame">
          <iframe
            title="The Chef Cafe Google Map Location"
            src="https://maps.google.com/maps?q=The+Chef+Cafe+Spire+Tower+Sector+19D+Vashi+Navi+Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '380px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-iframe"
          />
          <div className="map-badge">
            <span className="map-badge__pulse" aria-hidden="true" />
            <span>Open in Sector 19D, Vashi</span>
          </div>
        </div>

        {/* Location Details Card */}
        <div className="map-details-card">
          <div className="map-details-head">
            <span className="map-details-tag">DIRECTIONS & VISITING</span>
            <h3 className="map-details-title">{RESTAURANT_INFO.name}</h3>
            <p className="map-details-tagline">{RESTAURANT_INFO.tagline}</p>
          </div>

          <div className="map-info-grid">
            <div className="map-info-item">
              <span className="map-info-label">Address</span>
              <address className="map-info-val">
                {location.formattedAddress.map((line, i) => (
                  <span key={i} className="map-info-line">{line}</span>
                ))}
              </address>
            </div>

            <div className="map-info-item">
              <span className="map-info-label">Hours</span>
              <div className="map-info-val">
                <p>Lunch: {hours.lunch}</p>
                <p>Dinner: {hours.dinner}</p>
                <p className="map-info-highlight">{hours.days} (Closed Mon)</p>
              </div>
            </div>

            <div className="map-info-item">
              <span className="map-info-label">Arrival & Parking</span>
              <p className="map-info-val">
                Valet parking assistance available on arrival at Spire Tower. 7 mins from Vashi Railway Station.
              </p>
            </div>

            <div className="map-info-item">
              <span className="map-info-label">Quick Contacts</span>
              <div className="map-info-contacts">
                <a href={`tel:${contact.phoneCallable}`} className="map-contact-link">
                  📞 {contact.phoneDisplay}
                </a>
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-contact-link"
                >
                  💬 WhatsApp Inquiries
                </a>
              </div>
            </div>
          </div>

          <div className="map-actions">
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary map-directions-btn"
            >
              <span>Get Directions on Google Maps</span>
              <span aria-hidden="true">↗</span>
            </a>
            {onBookTable && (
              <button
                type="button"
                onClick={onBookTable}
                className="btn btn-outline"
              >
                Reserve a Table
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
