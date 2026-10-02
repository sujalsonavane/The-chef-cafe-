/**
 * Configuration parameters for the 3D Desktop Curtain Scene.
 */
export const SCENE_CONFIG = {
  // Source texture asset for the red theatrical curtain
  texturePath: '/Refrence/The%20chef%20cafe/download.jpg',

  // Camera settings
  camera: {
    fov: 45,
    near: 0.1,
    far: 100,
    startZ: 5.0,
    settleZ: -2.2,
    lookAtZ: -10.0,
  },

  // Curtain geometry and layout
  curtain: {
    coverageMultiplier: 1.30,
    openDistanceMultiplier: 0.52,
    uvMarginX: 0.02,
    uvMarginY: 0.05,
  },

  // Choreographed timeline milestones (0.0 to 1.0)
  timeline: {
    // Scroll indicator & location pointer fade out immediately on initial scroll
    indicatorFadeStart: 0.00,
    indicatorFadeEnd: 0.08,

    // Curtain enrichment (corners, top mark, pillars, divider) fades as curtain begins opening
    curtainEnrichmentFadeStart: 0.04,
    curtainEnrichmentFadeEnd: 0.16,

    // Curtain begins opening at 0.10
    curtainOpenStart: 0.10,

    // Title begins splitting outward
    titleSplitStart: 0.12,
    titleFadeStart: 0.20,
    titleFadeEnd: 0.32,

    // Rising Welcome Message ("Come through the red curtain"):
    // As title splits and fades, welcome message smoothly rises from below into dead center
    risingWelcomeStart: 0.18,
    risingWelcomeEnd: 0.30,
    // Holds centered, fully legible and framed by the red curtains through the opening
    risingWelcomeFadeStart: 0.44,
    risingWelcomeFadeEnd: 0.54,

    // Camera begins forward drive
    cameraForwardStart: 0.28,

    // Warm ambient background glow emerges through the parting curtains
    ambientGlowStart: 0.40,
    ambientGlowEnd: 0.58,

    // Camera approaches curtain plane
    cameraApproachCurtain: 0.44,
    // Curtain opening clearly frames viewport
    curtainOpeningFramed: 0.46,
    // Camera passes through curtain opening (crosses Z = 0)
    cameraPassCurtain: 0.50,
    // Curtain reaches full opening as camera clears it
    curtainOpenEnd: 0.54,

    // Camera settles behind curtain inside dining room
    cameraSettle: 0.58,

    // Interior dining welcome header emerges as camera enters
    welcomeStart: 0.52,
    welcomeEnd: 0.60,

    // Progressive Food Reveal:
    // STEP 1: Middle hero rises gracefully from below
    foodHeroStart: 0.56,
    foodHeroEnd: 0.68,
    // STEP 2: Right dish pops up with spring bounce
    foodRightStart: 0.62,
    foodRightEnd: 0.72,
    // STEP 3: Left dish pops up with spring bounce
    foodLeftStart: 0.66,
    foodLeftEnd: 0.76,

    // Showcase fully settled at 0.76
    showcaseSettle: 0.76,

    // Extended calm resting hold from 0.76 to 0.92 (3–4+ seconds of viewing time)
    exitTransitionStart: 0.92,
    exitTransitionEnd: 1.00,
  },

  // Scene atmosphere and lighting colors
  colors: {
    background: 0x060608,
    ambientLight: 0xfff4eb,
    keyLight: 0xffeedd,
    rimLight: 0x5a121e,
    floor: 0x0c0c10,
  },
} as const

export interface CinematicFoodItem {
  id: string
  name: string
  category: string
  image: string
  width: number
  height: number
  aspectRatio: string
  alt: string
}

export const CINEMATIC_FOOD_ITEMS: CinematicFoodItem[] = [
  {
    id: 'chilly-starter',
    name: 'Chicken Chilly',
    category: 'Indo-Chinese starter',
    image: '/images/food/chicken-chilly.jpg',
    width: 1200,
    height: 1600,
    aspectRatio: '3 / 4',
    alt: 'Glazed chicken chilly starter with savory garlic scallion glaze and shredded cabbage at The Chef Cafe',
  },
  {
    id: 'hero-kebab-platter',
    name: 'Chicken Kalmi Kebab & Tandoori Platter',
    category: 'Tandoori starter',
    image: '/images/food/hero-kebab-platter.jpg',
    width: 1200,
    height: 1600,
    aspectRatio: '3 / 4',
    alt: 'Lavish tandoori platter featuring Kalmi kebab drumsticks, green pahadi kebabs, malai kebabs, and live charcoal',
  },
  {
    id: 'crispy-dumplings',
    name: 'Crispy Fried Dumplings',
    category: 'Appetiser & dipping sauces',
    image: '/images/food/crispy-dumplings.jpg',
    width: 1200,
    height: 1600,
    aspectRatio: '3 / 4',
    alt: 'Crispy golden fried dumplings served on a ceramic platter with spicy schezwan and garlic dipping sauces',
  },
]
