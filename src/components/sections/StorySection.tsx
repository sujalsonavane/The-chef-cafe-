export function StorySection() {
  return (
    <section id="story" className="content-section">
      <div className="section-header text-center">
        <p className="eyebrow">Our Story</p>
        <h2 className="section-title">A culinary destination in Vashi</h2>
        <p className="section-lede">
          The Chef Cafe brings together multi-cuisine dining, live music, and handcrafted hospitality
          in the heart of Navi Mumbai. Built for family dinners, date nights, and celebratory gatherings,
          every dish is cooked to order with care and patience.
        </p>
      </div>

      <div className="story-showcase">
        <div className="story-showcase__frame">
          <img
            src="/images/showcase/story-dining.jpg"
            alt="Main dining room with ambient lighting and spacious seating at The Chef Cafe in Vashi"
            width={1920}
            height={865}
            loading="lazy"
            decoding="async"
          />
          <div className="story-showcase__gradient" aria-hidden="true" />
        </div>
        <p className="story-showcase__caption">Main Dining Room & Ambience • The Chef Cafe, Vashi</p>
      </div>
    </section>
  )
}