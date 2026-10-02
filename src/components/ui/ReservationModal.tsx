import { useState, useEffect, useCallback } from 'react'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  dishName?: string
}

export function ReservationModal({ isOpen, onClose, dishName }: ReservationModalProps) {
  const [guests, setGuests] = useState('2')
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [time, setTime] = useState('20:00')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleClose = useCallback(() => {
    setConfirmed(false)
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          onClick={handleClose}
          aria-label="Close reservation modal"
        >
          ✕
        </button>

        {!confirmed ? (
          <>
            <div className="modal-header">
              <span className="modal-tag">The Chef Cafe · Vashi</span>
              <h2 id="modal-title" className="modal-title">Reserve Your Table</h2>
              <p className="modal-desc">
                {dishName
                  ? `Reserving a table to experience our ${dishName}.`
                  : 'Fine multi-cuisine dining, live music & memorable celebrations.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Guests</label>
                <div className="guests-selector" role="radiogroup" aria-label="Number of guests">
                  {['2', '4', '6', '8+'].map((num) => (
                    <button
                      type="button"
                      key={num}
                      className={`guest-pill ${guests === num ? 'is-active' : ''}`}
                      onClick={() => setGuests(num)}
                    >
                      {num} {num === '8+' ? 'Guests' : 'Seats'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-date" className="form-label">Date</label>
                  <input
                    id="res-date"
                    type="date"
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="res-time" className="form-label">Time</label>
                  <select
                    id="res-time"
                    className="form-input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">1:30 PM (Lunch)</option>
                    <option value="19:00">7:00 PM (Dinner)</option>
                    <option value="20:00">8:00 PM (Prime Dinner)</option>
                    <option value="21:00">9:00 PM (Live Music)</option>
                    <option value="22:00">10:00 PM (Late Night)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-name" className="form-label">Name</label>
                  <input
                    id="res-name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="res-phone" className="form-label">Phone</label>
                  <input
                    id="res-phone"
                    type="tel"
                    className="form-input"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="res-notes" className="form-label">Special Seating / Occasion (Optional)</label>
                <input
                  id="res-notes"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Birthday celebration, booth seating, near stage"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn--primary modal-submit">
                Confirm Reservation
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h3 className="success-title">Table Reserved!</h3>
            <p className="success-desc">
              Thank you, <strong>{name || 'Guest'}</strong>. Your table for{' '}
              <strong>{guests} guests</strong> on <strong>{date}</strong> at{' '}
              <strong>{time}</strong> is confirmed.
            </p>
            <p className="success-sub">
              We look forward to welcoming you at The Chef Cafe in Vashi.
            </p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
