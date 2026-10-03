import { Button } from '../ui/Button'

interface ReservationsSectionProps {
  onBookTable?: () => void
}

export function ReservationsSection({ onBookTable }: ReservationsSectionProps) {
  return (
    <section id="reservations" className="content-section">
      <div className="reservations-wrapper">
        <div className="reservations-wrapper__bg" aria-hidden="true">
          <img
            src="/images/showcase/reservations-ambience.jpg"
            alt="The Chef Cafe dining ambience and warm lighting"
            width={1800}
            height={810}
            loading="lazy"
            decoding="async"
          />
          <div className="reservations-wrapper__gradient" />
        </div>

        <div className="reservations-wrapper__content">
          <p className="eyebrow">Reservations</p>
          <h2 className="section-title">Reserve your table</h2>
          <p className="section-lede">
            Walk-ins are always welcome, but a reservation guarantees your preferred table for dinner,
            live music nights, and family celebrations.
          </p>
          <Button variant="primary" onClick={onBookTable}>
            Book a table
          </Button>
        </div>
      </div>
    </section>
  )
}