export function SpaceSection() {
  return (
    <section id="space" className="content-section">
      <div className="section-header text-center">
        <p className="eyebrow">The Space</p>
        <h2 className="section-title">Designed for connection & celebration</h2>
        <p className="section-lede">
          Spacious dining halls, intimate family booths, live music staging, and an energetic lounge.
          The room is tuned to feel both celebratory and welcoming from afternoon dining through late evenings.
        </p>
      </div>

      <div className="space-gallery">
        <div className="space-gallery__card space-gallery__card--interior">
          <img
            src="/Refrence/The%20chef%20cafe/AHRPTWkzyPvDMyIPByMQAcB2dLUUCjTT0qw-eL4o3KhgVdlqq6T0McTYNZfGIlwhsBAIj9IbWKeR40Ovwy8VwylP7xPkddCcpKvs6Yv4WQCdsecz81E-6bkIHof706dYWBThSG5p4t9u2ZEAim8Uw4080-h3060-k-no.jpg"
            alt="Bar counter and lounge seating with warm timber finishes and designer lighting at The Chef Cafe"
            width={4080}
            height={3060}
            loading="lazy"
            decoding="async"
          />
          <div className="space-gallery__caption">Lounge Bar & Dining Ambience</div>
        </div>

        <div className="space-gallery__card space-gallery__card--exterior">
          <img
            src="/Refrence/The%20chef%20cafe/AHRPTWmjqxJAOxTUZi_WtMMuF1lG-7Iwb_TTmbSwD8gQKaZginfvykQq-dr0Yivk1VagoYdMoobwqKnrqwqpkCqq9ylVU2-urzwUxwpx6lwja892r1w2BAMZhDVUxh2kXEjgE3S2xMAZueiCetKtw3060-h4080-k-no.jpg"
            alt="The Chef Cafe exterior entrance and facade with illuminated sign in Vashi, Navi Mumbai"
            width={3060}
            height={4080}
            loading="lazy"
            decoding="async"
          />
          <div className="space-gallery__caption">The Chef Cafe Entrance • Vashi</div>
        </div>
      </div>
    </section>
  )
}