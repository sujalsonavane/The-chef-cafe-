import { useState } from 'react'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'food' | 'bar' | 'events'
}

const FAQS: FaqItem[] = [
  {
    id: 'hours',
    category: 'general',
    question: 'What are your operating hours and weekly schedule?',
    answer:
      'We welcome diners Tuesday through Sunday. Lunch is served from 12:00 PM to 4:00 PM, and Dinner & Lounge service runs from 7:00 PM to 1:00 AM. We are closed on Mondays for kitchen maintenance and team rest.',
  },
  {
    id: 'reservation-walkin',
    category: 'general',
    question: 'Do I need a reservation, or do you accept walk-ins?',
    answer:
      'Walk-ins are always warmly welcomed! For weekend dinners (Friday–Sunday), prime hours (8:00 PM to 10:30 PM), and live music evenings, reserving your table online or via phone is strongly advised to guarantee your preferred seating without waiting.',
  },
  {
    id: 'veg-jain',
    category: 'food',
    question: 'Do you offer pure vegetarian and Jain food options?',
    answer:
      'Yes, extensively! Our kitchen features dedicated vegetarian clay-oven tandoor specialties, paneer curries, slow-cooked veg dum biryanis, and Indo-Chinese wok dishes. Jain preparations (made strictly without onion and garlic) are gladly prepared fresh upon request.',
  },
  {
    id: 'bar-drinks',
    category: 'bar',
    question: 'Do you have a live bar, craft cocktails, and mocktails?',
    answer:
      'Yes. The Chef Cafe features a fully licensed lounge bar offering signature craft cocktails, premium spirits, beers, and a wide selection of hand-muddled mocktails, iced coolers, and shakes for all guests.',
  },
  {
    id: 'private-parties',
    category: 'events',
    question: 'Can we book for birthdays, corporate dinners, or private parties?',
    answer:
      'Absolutely. Our spacious multi-cuisine dining hall, intimate booth lounge, and stage area comfortably host parties from 10 to 80+ guests. We provide customized group menus, cake service, and personalized arrangements for your special moments.',
  },
  {
    id: 'parking',
    category: 'general',
    question: 'Is parking available at Spire Tower in Vashi?',
    answer:
      'Yes! Ample building parking and dedicated valet parking assistance are readily available at Spire Tower, Sector 19D, Vashi for all The Chef Cafe diners.',
  },
  {
    id: 'live-music',
    category: 'events',
    question: 'When do you host live music and entertainment?',
    answer:
      'We host live acoustic sessions, Sufi & Bollywood live singers, and weekend curated DJ nights on select evenings (primarily Friday through Sunday). Check our Instagram @thechefcafe or inquire with our team for this week’s lineup.',
  },
]

interface FaqSectionProps {
  onBookTable?: () => void
}

export function FaqSection({ onBookTable }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>('hours')

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="content-section faq-section" aria-labelledby="faq-title">
      <div className="section-header text-center">
        <p className="eyebrow">COMMON INQUIRIES</p>
        <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
        <p className="section-lede">
          Everything you need to know about dining, reservations, dietary preferences, and events at The Chef Cafe.
        </p>
      </div>

      <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions list">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div
              key={faq.id}
              className={`faq-item${isOpen ? ' is-open' : ''}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-btn-${faq.id}`}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-toggle-icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                role="region"
                aria-labelledby={`faq-btn-${faq.id}`}
                className={`faq-answer-panel${isOpen ? ' is-expanded' : ''}`}
              >
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="faq-support-strip">
        <div className="faq-support-content">
          <h4>Have a specific inquiry or celebration request?</h4>
          <p>Our team is available every day to assist with custom dining menus, private lounge bookings, and table inquiries.</p>
        </div>
        <div className="faq-support-actions">
          {onBookTable && (
            <button
              type="button"
              onClick={onBookTable}
              className="btn btn-primary"
            >
              Book a Table
            </button>
          )}
          <a
            href="https://wa.me/919820012345?text=Hi%20The%20Chef%20Cafe%2C%20I%20have%20an%20inquiry%20regarding%20dining."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Chat on WhatsApp ↗
          </a>
        </div>
      </div>
    </section>
  )
}
