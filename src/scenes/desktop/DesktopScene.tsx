import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CurtainScene } from './CurtainScene'
import { SCENE_CONFIG, CINEMATIC_FOOD_ITEMS } from './sceneConfig'

import { CornerFlourish } from '../../components/cinematic/CornerFlourish'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface DesktopSceneProps {
  onReady?: () => void
}

export function DesktopScene({ onReady }: DesktopSceneProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ambientGlowRef = useRef<HTMLDivElement>(null)
  const brandOverlayRef = useRef<HTMLDivElement>(null)
  const titleLeftRef = useRef<HTMLSpanElement>(null)
  const titleRightRef = useRef<HTMLSpanElement>(null)
  const locationPointerRef = useRef<HTMLAnchorElement>(null)
  const scrollIndicatorRef = useRef<HTMLParagraphElement>(null)
  const foodStageRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const sec1Ref = useRef<HTMLElement>(null)
  const sec2Ref = useRef<HTMLElement>(null)

  // ── THEATRICAL STAGE COMPOSITION REFS ─────────────────────────────────────
  const frameRef = useRef<HTMLDivElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)
  const logoCrestRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLSpanElement>(null)
  const flankedRowRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const diamondRef = useRef<HTMLDivElement>(null)
  const risingWelcomeRef = useRef<HTMLDivElement>(null)

  const heroDish = CINEMATIC_FOOD_ITEMS.find((d) => d.id === 'hero-kebab-platter') || CINEMATIC_FOOD_ITEMS[1]
  const sec1Dish = CINEMATIC_FOOD_ITEMS.find((d) => d.id === 'chilly-starter') || CINEMATIC_FOOD_ITEMS[0]
  const sec2Dish = CINEMATIC_FOOD_ITEMS.find((d) => d.id === 'crispy-dumplings') || CINEMATIC_FOOD_ITEMS[2]

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const container = containerRef.current
    const ambientGlow = ambientGlowRef.current
    const brandOverlay = brandOverlayRef.current
    const titleLeft = titleLeftRef.current
    const titleRight = titleRightRef.current
    const locationPointer = locationPointerRef.current
    const scrollIndicator = scrollIndicatorRef.current
    const foodStage = foodStageRef.current
    const welcome = welcomeRef.current
    const heroEl = heroRef.current
    const sec1El = sec1Ref.current
    const sec2El = sec2Ref.current

    // Stage composition elements
    const frame = frameRef.current
    const cornerTL = cornerTLRef.current
    const cornerTR = cornerTRRef.current
    const cornerBL = cornerBLRef.current
    const cornerBR = cornerBRRef.current
    const logoCrest = logoCrestRef.current
    const eyebrow = eyebrowRef.current
    const flankedRow = flankedRowRef.current
    const tagline = taglineRef.current
    const diamond = diamondRef.current
    const risingWelcome = risingWelcomeRef.current

    if (
      !track ||
      !stage ||
      !container ||
      !ambientGlow ||
      !brandOverlay ||
      !titleLeft ||
      !titleRight ||
      !locationPointer ||
      !scrollIndicator ||
      !foodStage ||
      !welcome ||
      !heroEl ||
      !sec1El ||
      !sec2El ||
      !frame ||
      !cornerTL ||
      !cornerTR ||
      !cornerBL ||
      !cornerBR ||
      !logoCrest ||
      !eyebrow ||
      !flankedRow ||
      !tagline ||
      !diamond ||
      !risingWelcome
    ) {
      return
    }

    // 1. Initialize CurtainScene Three.js manager
    const scene = new CurtainScene(container, {
      onTextureLoaded: () => {
        onReady?.()
      },
    })

    // 2. Set initial hidden states for overlays — distinct motion archetypes:
    //    ───────────────────────────────────────────────────────────────
    //    MIDDLE (hero):        starts deep below for dramatic "rise" entrance
    //    RIGHT  (sec2):        tiny hidden + opacity 0 for spring "pop up" entrance
    //    LEFT   (sec1):        tiny hidden + opacity 0 for spring "pop up" entrance (last)
    //
    //    NEW CURTAIN ENRICHMENT (initial page-load reveal, then fade as curtain opens)
    //      ├─ Corner flourishes: start invisible, enter on load with stagger
    //      ├─ Top mark (est. year + tagline): starts tiny/hidden, enters on load
    //      ├─ Pillars row (signature chips): starts tiny/hidden, enters staggered on load
    //      ├─ Divider hairline: starts 0 width, grows centered on load
    //      └─ RISING WELCOME (bottom→top scrub): y: +260 well below stage, opacity 0.25 -> 1 as rises
    //
    gsap.set(ambientGlow, { opacity: 0 })
    gsap.set(foodStage, { autoAlpha: 0 })
    gsap.set(welcome, { opacity: 0, y: 28, scale: 0.96 })
    gsap.set(heroEl, { opacity: 0, y: 180, scale: 0.9 })
    gsap.set(sec2El, { opacity: 0, y: 60, scale: 0.35 })
    gsap.set(sec1El, { opacity: 0, y: 60, scale: 0.35 })

    // ── Curtain Stage Composition initial hidden states ─────────────────
    gsap.set([cornerTL, cornerTR, cornerBL, cornerBR, frame], { opacity: 0, scale: 0.96 })
    gsap.set(logoCrest, { opacity: 0, scale: 0.8, y: -10 })
    gsap.set([eyebrow, flankedRow, tagline], { opacity: 0, y: -14 })
    gsap.set(diamond, { opacity: 0, scale: 0 })
    // GSAP owns transform (xPercent + yPercent + y + scale). Start fully hidden below center.
    gsap.set(risingWelcome, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      y: 70,
      scale: 0.94,
    })

    // 3. Create master GSAP timeline (paused, scrubbed deterministically by ScrollTrigger)
    const timeline = gsap.timeline({ paused: true })

    // ── 0. PAGE-LOAD: Theatrical Stage Composition Entrance ───────────────
    const entrance = gsap.timeline()
    // Inset frame & Victorian Corner Flourishes entrance
    entrance.to(
      [cornerTL, cornerBR],
      { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
      0.05
    )
    entrance.to(
      [cornerTR, cornerBL],
      { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' },
      0.18
    )
    entrance.to(
      frame,
      { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' },
      0.12
    )
    // Logo Medallion with halo
    entrance.to(
      logoCrest,
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' },
      0.22
    )
    // Eyebrow, Flanked row, and Subtitle
    entrance.to(
      eyebrow,
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      0.32
    )
    entrance.to(
      flankedRow,
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.44
    )
    entrance.to(
      tagline,
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.54
    )
    entrance.to(
      diamond,
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
      0.64
    )

    // Rising welcome: rises smoothly from below into dead center as title splits and curtain parts
    timeline.to(
      risingWelcome,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: SCENE_CONFIG.timeline.risingWelcomeEnd - SCENE_CONFIG.timeline.risingWelcomeStart,
        ease: 'power2.out',
      },
      SCENE_CONFIG.timeline.risingWelcomeStart
    )
    // As camera moves forward through curtain opening, welcome message glides upward and dissolves
    timeline.to(
      risingWelcome,
      {
        autoAlpha: 0,
        y: -70,
        scale: 1.05,
        duration: SCENE_CONFIG.timeline.risingWelcomeFadeEnd - SCENE_CONFIG.timeline.risingWelcomeFadeStart,
        ease: 'power2.in',
      },
      SCENE_CONFIG.timeline.risingWelcomeFadeStart
    )

    // ── Graceful Exit (as curtain opens) ──────────────────────────────────
    timeline.to(
      [cornerTL, cornerTR, cornerBL, cornerBR, frame, logoCrest, eyebrow, flankedRow, tagline, diamond],
      {
        opacity: 0,
        scale: 0.96,
        duration: SCENE_CONFIG.timeline.curtainEnrichmentFadeEnd - SCENE_CONFIG.timeline.curtainEnrichmentFadeStart,
        ease: 'power2.in',
      },
      SCENE_CONFIG.timeline.curtainEnrichmentFadeStart
    )

    // A. "Scroll to enter" indicator & location pointer fade out promptly on scroll (0.00 to 0.08)
    timeline.to(
      [scrollIndicator, locationPointer],
      {
        opacity: 0,
        y: -8,
        duration: SCENE_CONFIG.timeline.indicatorFadeEnd - SCENE_CONFIG.timeline.indicatorFadeStart,
        ease: 'power1.out',
      },
      SCENE_CONFIG.timeline.indicatorFadeStart
    )
    timeline.set(
      locationPointer,
      {
        pointerEvents: 'none',
        visibility: 'hidden',
      },
      SCENE_CONFIG.timeline.indicatorFadeEnd
    )

    // B. Curtain opening — calibrated in 3 synchronized stages:
    // Stage 1 (0.15 to 0.45): Curtains crack open slightly as title begins splitting (progress 0 -> 0.18)
    const curtainProxy = { progress: 0 }
    timeline.to(
      curtainProxy,
      {
        progress: 0.18,
        duration: SCENE_CONFIG.timeline.cameraForwardStart - SCENE_CONFIG.timeline.curtainOpenStart,
        ease: 'power1.inOut',
        onUpdate: () => {
          scene.curtainPanels.setOpenProgress(curtainProxy.progress)
        },
      },
      SCENE_CONFIG.timeline.curtainOpenStart
    )

    // Stage 2 (0.45 to 0.68): Curtains part dynamically framing camera approach (progress 0.18 -> 0.44)
    timeline.to(
      curtainProxy,
      {
        progress: 0.44,
        duration: SCENE_CONFIG.timeline.cameraApproachCurtain - SCENE_CONFIG.timeline.cameraForwardStart,
        ease: 'power1.inOut',
        onUpdate: () => {
          scene.curtainPanels.setOpenProgress(curtainProxy.progress)
        },
      },
      SCENE_CONFIG.timeline.cameraForwardStart
    )

    // Stage 3 (0.68 to 0.80): Curtains sweep wide as camera drives through and crosses plane (progress 0.44 -> 1.0)
    timeline.to(
      curtainProxy,
      {
        progress: 1.0,
        duration: SCENE_CONFIG.timeline.curtainOpenEnd - SCENE_CONFIG.timeline.cameraApproachCurtain,
        ease: 'power2.in',
        onUpdate: () => {
          scene.curtainPanels.setOpenProgress(curtainProxy.progress)
        },
      },
      SCENE_CONFIG.timeline.cameraApproachCurtain
    )

    // C. Brand Title Split — "THE CHEF" moves left, "CAFE" moves right (0.30 to 0.58)
    // Phase 1: Begins splitting at 0.30 in sync with opening curtains
    const splitDuration = SCENE_CONFIG.timeline.titleFadeStart - SCENE_CONFIG.timeline.titleSplitStart
    timeline.to(
      titleLeft,
      {
        xPercent: -35,
        duration: splitDuration,
        ease: 'power2.inOut',
      },
      SCENE_CONFIG.timeline.titleSplitStart
    )
    timeline.to(
      titleRight,
      {
        xPercent: 35,
        duration: splitDuration,
        ease: 'power2.inOut',
      },
      SCENE_CONFIG.timeline.titleSplitStart
    )

    // Phase 2: As camera drives forward, title parts wider and fades cleanly by 0.58
    const fadeDuration = SCENE_CONFIG.timeline.titleFadeEnd - SCENE_CONFIG.timeline.titleFadeStart
    timeline.to(
      titleLeft,
      {
        xPercent: -75,
        scale: 1.08,
        opacity: 0,
        duration: fadeDuration,
        ease: 'power2.in',
      },
      SCENE_CONFIG.timeline.titleFadeStart
    )
    timeline.to(
      titleRight,
      {
        xPercent: 75,
        scale: 1.08,
        opacity: 0,
        duration: fadeDuration,
        ease: 'power2.in',
      },
      SCENE_CONFIG.timeline.titleFadeStart
    )

    // Ensure brand overlay is completely hidden once rising welcome fades
    timeline.set(
      brandOverlay,
      {
        visibility: 'hidden',
      },
      SCENE_CONFIG.timeline.risingWelcomeFadeEnd
    )

    // D. Camera Choreography (approach -> cross curtain opening -> settle inside)
    // 1. Subtle anticipation creep from curtainOpenStart to cameraForwardStart
    timeline.to(
      scene.cameraRig.camera.position,
      {
        z: 4.8,
        duration: SCENE_CONFIG.timeline.cameraForwardStart - SCENE_CONFIG.timeline.curtainOpenStart,
        ease: 'power1.in',
      },
      SCENE_CONFIG.timeline.curtainOpenStart
    )

    // 2. Strong forward drive toward opening from 0.45 to 0.68 (moves to Z = 2.2, curtain edges framing view)
    timeline.to(
      scene.cameraRig.camera.position,
      {
        z: 2.2,
        duration: SCENE_CONFIG.timeline.cameraApproachCurtain - SCENE_CONFIG.timeline.cameraForwardStart,
        ease: 'power2.in',
      },
      SCENE_CONFIG.timeline.cameraForwardStart
    )

    // 3. Crossing the curtain opening from 0.68 to 0.76 (reaches exact Z = 0 as curtain panels sweep past)
    timeline.to(
      scene.cameraRig.camera.position,
      {
        z: 0.0,
        duration: SCENE_CONFIG.timeline.cameraPassCurtain - SCENE_CONFIG.timeline.cameraApproachCurtain,
        ease: 'power1.inOut',
      },
      SCENE_CONFIG.timeline.cameraApproachCurtain
    )

    // 4. Entering the interior space and settling behind curtain (0.76 to 0.85)
    timeline.to(
      scene.cameraRig.camera.position,
      {
        z: SCENE_CONFIG.camera.settleZ,
        duration: SCENE_CONFIG.timeline.cameraSettle - SCENE_CONFIG.timeline.cameraPassCurtain,
        ease: 'power2.out',
      },
      SCENE_CONFIG.timeline.cameraPassCurtain
    )

    // E. Warm interior atmosphere & ambient glow emerge through the parting opening (0.52 to 0.76)
    // Eliminates any dead black space as the title fades out
    timeline.set(
      foodStage,
      {
        autoAlpha: 1,
      },
      SCENE_CONFIG.timeline.ambientGlowStart
    )

    timeline.to(
      ambientGlow,
      {
        opacity: 1,
        duration: SCENE_CONFIG.timeline.ambientGlowEnd - SCENE_CONFIG.timeline.ambientGlowStart,
        ease: 'power1.inOut',
      },
      SCENE_CONFIG.timeline.ambientGlowStart
    )

    const warmthProxy = { value: 0 }
    timeline.to(
      warmthProxy,
      {
        value: 1,
        duration: SCENE_CONFIG.timeline.ambientGlowEnd - SCENE_CONFIG.timeline.ambientGlowStart,
        ease: 'power1.inOut',
        onUpdate: () => {
          scene.setAtmosphereWarmth(warmthProxy.value)
        },
      },
      SCENE_CONFIG.timeline.ambientGlowStart
    )

    // F. Cinematic Welcome message reveals as camera enters space (0.72 to 0.80)
    timeline.to(
      welcome,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: SCENE_CONFIG.timeline.welcomeEnd - SCENE_CONFIG.timeline.welcomeStart,
        ease: 'power2.out',
      },
      SCENE_CONFIG.timeline.welcomeStart
    )

    // G. Progressive Editorial Food Reveal — Scroll-Step Choreography:
    //
    // SCROLL STEP 1  (0.58 → 0.72):  MIDDLE HERO DISH Rises from deep below
    //   Clean vertical lift: y from 220 → 0, subtle scale grow from 0.88 → 1.0, blur clears
    //   Easing: power2.out gives a gracefully decelerating rise with weight & presence
    //
    // SCROLL STEP 2  (0.72 → 0.84):  RIGHT DISH Pops up (spring bounce pop)
    //   Scale from 0.28 → 1.05 (slight overshoot) → 1.0, y from 80 → 0
    //   Easing: back.out(1.8) — classic premium pop with just enough spring "bounce" at settle
    //
    // SCROLL STEP 3  (0.84 → 0.94):  LEFT DISH Pops up (mirroring right dish)
    //   Identical spring pop motion, choreographed as the final scroll flourish
    //
    // 1. Primary Hero Dish (Center) — DRAMATIC RISE from below
    timeline.to(
      heroEl,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: SCENE_CONFIG.timeline.foodHeroEnd - SCENE_CONFIG.timeline.foodHeroStart,
        ease: 'power2.out',
      },
      SCENE_CONFIG.timeline.foodHeroStart
    )

    // 2. Secondary Dish 2 (RIGHT) — SPRING POP UP as second scroll step
    //    Final y: -8 matches editorial asymmetric layout (right sits slightly higher)
    timeline.to(
      sec2El,
      {
        opacity: 1,
        scale: 1,
        y: -8,
        duration: SCENE_CONFIG.timeline.foodRightEnd - SCENE_CONFIG.timeline.foodRightStart,
        ease: 'back.out(1.75)',
      },
      SCENE_CONFIG.timeline.foodRightStart
    )

    // 3. Secondary Dish 1 (LEFT) — SPRING POP UP as final scroll flourish
    //    Final y: 18 matches editorial asymmetric layout (left sits slightly lower)
    timeline.to(
      sec1El,
      {
        opacity: 1,
        scale: 1,
        y: 18,
        duration: SCENE_CONFIG.timeline.foodLeftEnd - SCENE_CONFIG.timeline.foodLeftStart,
        ease: 'back.out(1.75)',
      },
      SCENE_CONFIG.timeline.foodLeftStart
    )

    // H. Continuous smooth upward handoff directly into main website (0.96 to 1.00)
    // Avoids abrupt cutoff or black blank frame; food composition glides smoothly into the unpin moment
    const exitDuration = SCENE_CONFIG.timeline.exitTransitionEnd - SCENE_CONFIG.timeline.exitTransitionStart
    timeline.to(
      foodStage,
      {
        yPercent: -14,
        opacity: 0.90,
        duration: exitDuration,
        ease: 'power1.in',
      },
      SCENE_CONFIG.timeline.exitTransitionStart
    )

    timeline.to(
      ambientGlow,
      {
        opacity: 0.65,
        duration: exitDuration,
        ease: 'power1.in',
      },
      SCENE_CONFIG.timeline.exitTransitionStart
    )

    // 4. Create ScrollTrigger to scrub timeline and pin stage
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      pinSpacing: true,
      scrub: 0.5,
      animation: timeline,
      invalidateOnRefresh: true,
      onLeave: () => {
        scene.setVisible(false)
      },
      onEnterBack: () => {
        scene.setVisible(true)
      },
    })

    // 5. Resize handling via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          scene.resize(width, height)
          ScrollTrigger.refresh()
        }
      }
    })
    resizeObserver.observe(container)

    // Initial render call
    scene.render()

    // 6. Cleanup on unmount
    return () => {
      resizeObserver.disconnect()
      trigger.kill()
      timeline.kill()
      entrance.kill()
      scene.dispose()
    }
  }, [onReady])

  return (
    <div ref={trackRef} className="cinematic-track">
      <div ref={stageRef} className="cinematic-stage">
        {/* Three.js curtain & camera canvas */}
        <div ref={containerRef} className="cinematic-canvas-container" />

        {/* Warm ambient background glow */}
        <div ref={ambientGlowRef} className="cinematic-ambient-glow" aria-hidden="true" />

        {/* Phase 1: Brand title on closed curtain */}
        <div ref={brandOverlayRef} className="cinematic-brand-overlay">
          {/* ─── GOLDEN INSET FRAME & ORNATE VICTORIAN CORNER FLOURISHES ─── */}
          <div ref={frameRef} className="curtain-stage-frame" aria-hidden="true">
            <div ref={cornerTLRef} className="curtain-corner-flourish curtain-corner--tl">
              <CornerFlourish />
            </div>
            <div ref={cornerTRRef} className="curtain-corner-flourish curtain-corner--tr">
              <CornerFlourish />
            </div>
            <div ref={cornerBLRef} className="curtain-corner-flourish curtain-corner--bl">
              <CornerFlourish />
            </div>
            <div ref={cornerBRRef} className="curtain-corner-flourish curtain-corner--br">
              <CornerFlourish />
            </div>
            <div className="curtain-frame-border" />
          </div>

          {/* ─── GOLDEN SPARKLE STAR (Lower-Right) ─── */}
          <div className="curtain-sparkle-star" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </svg>
          </div>

          {/* ─── CENTER HERO COMPOSITION ─── */}
          <div className="cinematic-hero-stack">
            {/* 1. Cafe Logo Medallion with Golden Halo */}
            <div ref={logoCrestRef} className="curtain-logo-crest">
              <div className="curtain-logo-crest__halo" aria-hidden="true" />
              <img
                src="/logo-256.png"
                alt="The Chef Cafe crest"
                className="curtain-logo-crest__img"
                width={82}
                height={82}
                loading="eager"
                decoding="async"
              />
            </div>

            {/* 2. Eyebrow: ✦ VASHI · NAVI MUMBAI ✦ */}
            <span ref={eyebrowRef} className="curtain-hero-eyebrow">
              ✦&nbsp;&nbsp;VASHI · NAVI MUMBAI&nbsp;&nbsp;✦
            </span>

            {/* 3. Flanked Row: [ ✦ TANDOORI KITCHEN ] · Est. 2024 · [ ✦ AL FRESCO DINING ] */}
            <div ref={flankedRowRef} className="curtain-flanked-row" role="list" aria-label="Highlights">
              <span className="curtain-flank-pill" role="listitem">
                <span className="flank-pill-star" aria-hidden="true">✦</span>
                <span>TANDOORI KITCHEN</span>
              </span>
              <span className="curtain-flank-center">
                <span className="flank-dot" aria-hidden="true">·</span>
                <span className="flank-year">Est. 2024</span>
                <span className="flank-dot" aria-hidden="true">·</span>
              </span>
              <span className="curtain-flank-pill" role="listitem">
                <span className="flank-pill-star" aria-hidden="true">✦</span>
                <span>AL FRESCO DINING</span>
              </span>
            </div>

            {/* 4. Subtitle: A Stage for Unforgettable Dining */}
            <p ref={taglineRef} className="curtain-hero-tagline">
              A Stage for Unforgettable Dining
            </p>

            {/* 5. Classical Serif Main Title with 3D drop shadow */}
            <h1 className="cinematic-title" aria-label="The Chef Cafe">
              <span ref={titleLeftRef} className="title-part title-part--left">
                THE CHEF
              </span>
              <span className="title-spacer" aria-hidden="true">
                &nbsp;
              </span>
              <span ref={titleRightRef} className="title-part title-part--right">
                CAFE
              </span>
            </h1>

            {/* 6. Diamond Separator */}
            <div ref={diamondRef} className="curtain-diamond-separator" aria-hidden="true">
              ◆
            </div>

            {/* 7. Location Pill */}
            <a
              ref={locationPointerRef}
              href="https://www.google.com/maps/search/?api=1&query=The+Chef+Cafe+Spire+Tower+Sector+19D+Vashi+Navi+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="cinematic-location-pointer"
              title="Open The Chef Cafe on Google Maps"
              aria-label="Open The Chef Cafe location on Google Maps"
            >
              <svg
                className="location-pin-icon"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              <span>Sector 19D, Vashi · Navi Mumbai</span>
              <span className="location-pointer-arrow" aria-hidden="true">↗</span>
            </a>

            {/* 8. Scroll Indicator */}
            <p ref={scrollIndicatorRef} className="cinematic-scroll-indicator">
              — SCROLL TO ENTER —
            </p>
          </div>

          {/* ─── RISING WELCOME MESSAGE ─── translates BOTTOM → TOP as user scrolls */}
          <div ref={risingWelcomeRef} className="curtain-rising-welcome">
            <span className="curtain-rising-welcome__eyebrow">
              ~ Welcome inside ~
            </span>
            <h2 className="curtain-rising-welcome__headline">
              Come through the red curtain
            </h2>
            <p className="curtain-rising-welcome__lede">
              Where every evening is a performance on the plate ·  A tasting journey crafted with care
            </p>
          </div>
        </div>

        {/* Phase 2: Cinematic Welcome & Editorial Food Reveal */}
        <div ref={foodStageRef} className="cinematic-food-stage">
          <div ref={welcomeRef} className="cinematic-welcome">
            <span className="cinematic-welcome__eyebrow">Welcome to</span>
            <h2 className="cinematic-welcome__title">The Chef Cafe</h2>
            <p className="cinematic-welcome__tagline">Food • Music • Dining • Moments</p>
          </div>

          <div className="editorial-showcase">
            {/* Secondary Dish 1 - Flanking Left */}
            <article ref={sec1Ref} className="editorial-item editorial-item--secondary-1">
              <div className="editorial-item__frame">
                <img
                  src={sec1Dish.image}
                  alt={sec1Dish.alt}
                  width={sec1Dish.width}
                  height={sec1Dish.height}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const el = e.currentTarget
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = 'true'
                      el.src = '/Refrence/The%20chef%20cafe/ACvplmOguVnaqiiRwSkLgvg-q-ffzjrH75hwO3Ov88EZg9AJVHH-oHENDz7RSkbvLWsB6ZhOOg7jFKPTXmTEEX40sfAzJcA_YpcCp506Kfc3q6ADWTxmCjGfHEK6kwg5tGyCDCWHhOnA5nTqAdf1w3024-h4032-n-k-no.jpg'
                    }
                  }}
                />
                <div className="editorial-item__gradient" aria-hidden="true" />
              </div>
              <div className="editorial-item__info">
                <span className="editorial-item__tag">{sec1Dish.category}</span>
                <h3 className="editorial-item__name">{sec1Dish.name}</h3>
              </div>
            </article>

            {/* Primary Hero Dish - Center Commanding Focal Point */}
            <article ref={heroRef} className="editorial-item editorial-item--hero">
              <div className="editorial-item__frame">
                <img
                  src={heroDish.image}
                  alt={heroDish.alt}
                  width={heroDish.width}
                  height={heroDish.height}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const el = e.currentTarget
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = 'true'
                      el.src = '/Refrence/The%20chef%20cafe/ACvplmNMAONBaEck7ayal-8U-8A7IE2gINhv-WoUotg2u_tIB-v8Do9Tj6CNwvv3diaTVPlNSWfGV6mCHSo8odNZ5cWoL3fFJM_kFmlkhp-PCXGwqHH3xoKp-7ottMcEUoqA4ajXnymEI7DrXr-hw3060-h4080-n-k-no.jpg'
                    }
                  }}
                />
                <div className="editorial-item__gradient" aria-hidden="true" />
              </div>
              <div className="editorial-item__info">
                <span className="editorial-item__tag">{heroDish.category}</span>
                <h3 className="editorial-item__name">{heroDish.name}</h3>
              </div>
            </article>

            {/* Secondary Dish 2 - Flanking Right */}
            <article ref={sec2Ref} className="editorial-item editorial-item--secondary-2">
              <div className="editorial-item__frame">
                <img
                  src={sec2Dish.image}
                  alt={sec2Dish.alt}
                  width={sec2Dish.width}
                  height={sec2Dish.height}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const el = e.currentTarget
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = 'true'
                      el.src = '/Refrence/The%20chef%20cafe/ACvplmONZ7MVKzqfee14Ft3TR0_PH3e3qS2dJ5uOQP3PZMa9a-EkR1yZki6DmGHft8R7Fm563fmZZ5UpOBgRBNo9e0OTQXlKVZuVpmYKQkRG1zJsQNnMnnWihHUrG967tYQTfkj1qyo1RwdkzBtuw3472-h4640-n-k-no.jpg'
                    }
                  }}
                />
                <div className="editorial-item__gradient" aria-hidden="true" />
              </div>
              <div className="editorial-item__info">
                <span className="editorial-item__tag">{sec2Dish.category}</span>
                <h3 className="editorial-item__name">{sec2Dish.name}</h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopScene
