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
            src="/Refrence/The%20chef%20cafe/AHRPTWmgb5wnSO2EQ-Ai9Hs0diVwoQg34Tsz1FhjlAHD3JDt8WxtBUnUJEBlOobhHcfZnjaeoL2gM7P1XHiGl1zbweLt6upItO0L5007Se7ClJg67TTp2z3AUoj3eAJqLy3c_6p-5l0U9UKk7k4w4608-h2076-k-no.jpg"
            alt="Main dining room with ambient lighting and spacious seating at The Chef Cafe in Vashi"
            width={4608}
            height={2076}
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