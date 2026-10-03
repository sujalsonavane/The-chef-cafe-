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
            src="/images/showcase/space-lounge.jpg"
            alt="Bar counter and lounge seating with warm timber finishes and designer lighting at The Chef Cafe"
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
          />
          <div className="space-gallery__caption">Lounge Bar & Dining Ambience</div>
        </div>

        <div className="space-gallery__card space-gallery__card--exterior">
          <img
            src="/images/showcase/space-exterior.jpg"
            alt="The Chef Cafe exterior entrance and facade with illuminated sign in Vashi, Navi Mumbai"
            width={1050}
            height={1400}
            loading="lazy"
            decoding="async"
          />
          <div className="space-gallery__caption">The Chef Cafe Entrance • Vashi</div>
        </div>
      </div>
    </section>
  )
}