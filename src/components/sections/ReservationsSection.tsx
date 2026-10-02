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
            src="/Refrence/The%20chef%20cafe/AHRPTWm7DbTL3Phn8nr011jMbXdGO87lRsdmfxGvEFq-_fujCULcC4v-9f1YBCTA5LLH5stE2lgLo4rFC5zmvmQOLfuWBdalEs16BWtn5C4j0lUDxH8A6m4b5Rlw4HZclsUcWTS7OUtjt_M9ALEw2398-h1080-k-no.jpg"
            alt=""
            loading="eager"
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