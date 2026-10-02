export const AssetRole = {
  VISUAL_REFERENCE: 'visual-reference',
  WEBSITE_CONTENT_CANDIDATE: 'website-content-candidate',
  CINEMATIC_ASSET_CANDIDATE: 'cinematic-asset-candidate',
  TEXTURE_SOURCE_ASSET: 'texture-source-asset',
  MOTION_REFERENCE: 'motion-reference',
  MENU_CONTENT_REFERENCE: 'menu-content-reference',
} as const
export type AssetRole = (typeof AssetRole)[keyof typeof AssetRole]

export const AssetFileType = {
  JPEG: 'jpeg',
  PNG: 'png',
  VIDEO: 'mp4',
  SVG: 'svg',
} as const
export type AssetFileType = (typeof AssetFileType)[keyof typeof AssetFileType]

export interface AssetMetadata {
  fileType: AssetFileType
  dimensions?: { width: number; height: number }
  aspectRatio?: number
  fileSize: number
  fileSizeFormatted: string
  lastModified?: Date
  cameraInfo?: string
  deviceInfo?: string
  descriptiveTags?: string[]
}

export interface CatalogedAsset {
  id: string
  filename: string
  path: string
  role: AssetRole
  category: string
  title: string
  description: string
  metadata: AssetMetadata
  preferredUsage: string[]
  qualityConcerns?: string
  recommendations: string
}

// Comprehensive asset catalog for The Chef Cafe reference library
export const ASSET_CATALOG: CatalogedAsset[] = [
  // ================= VISUAL REFERENCES =================
  {
    id: 'curtain-interior-1',
    filename: 'ACvplmMvFjGmvs_Qr1JRZLC9-6iE5izQAcqSMfxCOVSwhCBsNhwGYl_m6IRNlJXol-0ugA0iCPwIFSIUhYj-4pkQTWVyFOPr6cyhThRzoZ98W522if1K7vw0vQMst4kX9PKGNR4jkds4U8Byb4w',
    path: '/public/Refrence/The chef cafe/ACvplmMvFjGmvs_Qr1JRZLC9-6iE5izQAcqSMfxCOVSwhCBsNhwGYl_m6IRNlJXol-0ugA0iCPwIFSIUhYj-4pkQTWVyFOPr6cyhThRzoZ98W522if1K7vw0vQMst4kX9PKGNR4jkds4U8Byb4w',
    role: AssetRole.VISUAL_REFERENCE,
    category: 'interior',
    title: 'Restaurant Interior - High Resolution',
    description: 'Detailed view of restaurant interior space with seating and lighting',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 4080, height: 3060 },
      aspectRatio: 4080 / 3060,
      fileSize: 4349304,
      fileSizeFormatted: '4.15MB',
      cameraInfo: 'Samsung Galaxy F14 5G',
      deviceInfo: 'High-end mobile photography',
      descriptiveTags: ['interior', 'seating', 'lighting', 'professional'],
    },
    preferredUsage: ['cinematic-background', 'reference', '3d-modeling'],
    qualityConcerns: 'Large file size, 4080x3060 pixels - consider compression for web use',
    recommendations: 'Best candidate for cinematic background or 3D scene reference',
  },

  // ================= CINEMATIC ASSET CANDIDATES =================
  {
    id: 'curtain-opening',
    filename: 'ACvplmMHnjCZpg4wC8p4yDDpG8Fu5nPFjqDZr25eu_fx-1lOb7AodmILpWY6DTznU6RH-4fiNBhIrIdVK6VkVrJbKoSnfHno9eqQnTSAUSgZe3fn1M_MeinnHhX_sWZh117wRdrYyob6xSOpfYHUw',
    path: '/public/Refrence/The chef cafe/ACvplmMHnjCZpg4wC8p4yDDpG8Fu5nPFjqDZr25eu_fx-1lOb7AodmILpWY6DTznU6RH-4fiNBhIrIdVK6VkVrJbKoSnfHno9eqQnTSAUSgZe3fn1M_MeinnHhX_sWZh117wRdrYyob6xSOpfYHUw',
    role: AssetRole.CINEMATIC_ASSET_CANDIDATE,
    category: 'exterior',
    title: 'Restaurant Exterior - Architectural Details',
    description: 'Facade and entrance details with architectural elements',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 1080, height: 1357 },
      aspectRatio: 1080 / 1357,
      fileSize: 759283,
      fileSizeFormatted: '741KB',
      descriptiveTags: ['exterior', 'architecture', 'entrance', 'daylight'],
    },
    preferredUsage: ['cinematic-introduction', 'hero-image', '3d-scene'],
    qualityConcerns: 'Lower resolution, 1080x1357 - good for hero section but limited detail',
    recommendations: 'Excellent candidate for cinematic introduction or hero section',
  },

  // ================= WEBSITE CONTENT CANDIDATES =================
  {
    id: 'restaurant-menu-detail',
    filename: 'ACvplmPOFHnsO_Cws1Uo_zQ4BwUtOehogxfgt3ERFIcTr74JebtJrjJeZGYA08myIalP1FPV-W_Qs9v8GFWR6W_dQ_OLtU7vpvWRVHN2AbQAn1gynUTl09BBNfYXPOmXMiab4cAYFbnme3DOXyg',
    path: '/public/Refrence/The chef cafe/ACvplmPOFHnsO_Cws1Uo_zQ4BwUtOehogxfgt3ERFIcTr74JebtJrjJeZGYA08myIalP1FPV-W_Qs9v8GFWR6W_dQ_OLtU7vpvWRVHN2AbQAn1gynUTl09BBNfYXPOmXMiab4cAYFbnme3DOXyg',
    role: AssetRole.WEBSITE_CONTENT_CANDIDATE,
    category: 'menu',
    title: 'Menu Detail Reference - Typography and Layout',
    description: 'Close-up view showing menu typography, ink patterns, and layout design',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 3024, height: 4032 },
      aspectRatio: 3024 / 4032,
      fileSize: 1040011,
      fileSizeFormatted: '1.04MB',
      descriptiveTags: ['menu', 'typography', 'layout', 'branding'],
    },
    preferredUsage: ['hero-texture', 'content-overlay', 'menu-section-background'],
    qualityConcerns: 'Typography and layout detail visible, good for design reference',
    recommendations: 'Good candidate for menu section background or text overlay',
  },

  // ================= MENU/CONTENT REFERENCES =================
  {
    id: 'signature-dish-1',
    filename: 'ACvplmNMAONBaEck7ayal-8U-8A7IE2gINhv-WoUotg2u_tIB-v8Do9Tj6CNwvv3diaTVPlNSWfGV6mCHSo8odNZ5cWoL3fFJM_kFmlkhp-PCXGwqHH3xoKp-7ottMcEUoqA4ajXnymEI7DrXr-hw3060-h4080-n-k-no',
    path: '/public/Refrence/The chef cafe/ACvplmNMAONBaEck7ayal-8U-8A7IE2gINhv-WoUotg2u_tIB-v8Do9Tj6CNwvv3diaTVPlNSWfGV6mCHSo8odNZ5cWoL3fFJM_kFmlkhp-PCXGwqHH3xoKp-7ottMcEUoqA4ajXnymEI7DrXr-hw3060-h4080-n-k-no',
    role: AssetRole.MENU_CONTENT_REFERENCE,
    category: 'food',
    title: 'Signature Dish Photography',
    description: 'Professional food photography of signature restaurant dish',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 3060, height: 4080 },
      aspectRatio: 3060 / 4080,
      fileSize: 2125834,
      fileSizeFormatted: '2.03MB',
      descriptiveTags: ['food', 'photography', 'signature', 'culinary'],
    },
    preferredUsage: ['menu-gallery', 'hero-dish', 'culinary-showcase'],
    qualityConcerns: 'Professional food photography, high quality but consider SEO optimization',
    recommendations: 'Excellent candidate for menu gallery or culinary showcase section',
  },

  // ================= TEXTURE/SOURCE ASSETS =================
  {
    id: 'restaurant-texture',
    filename: 'ACvplmOWNUcInuIOn7c6pJKncPKFtct0JVKztZHUgta8iHJ46dPos_lRbue2hLuN2RrL0loWwyZw01JFnU-gWLHx74ghNAAvkTH_UI4iiQMOQRR9AqW2yL6gtZp553vurSMZLDlSUCtoTVh55qgw1024-h1292-k-no',
    path: '/public/Refrence/The chef cafe/ACvplmOWNUcInuIOn7c6pJKncPKFtct0JVKztZHUgta8iHJ46dPos_lRbue2hLuN2RrL0loWwyZw01JFnU-gWLHx74ghNAAvkTH_UI4iiQMOQRR9AqW2yL6gtZp553vurSMZLDlSUCtoTVh55qgw1024-h1292-k-no',
    role: AssetRole.TEXTURE_SOURCE_ASSET,
    category: 'texture',
    title: 'Surface Texture Reference',
    description: 'Close-up texture pattern for surface materials and finishes',
    metadata: {
      fileType: AssetFileType.PNG,
      dimensions: { width: 1024, height: 1292 },
      aspectRatio: 1024 / 1292,
      fileSize: 1469968,
      fileSizeFormatted: '1.48MB',
      descriptiveTags: ['texture', 'surface', 'material', 'pattern'],
    },
    preferredUsage: ['3d-texture', 'material-reference', 'pattern-library'],
    qualityConcerns: 'Interlaced JPEG, requires texture filtering for smooth rendering',
    recommendations: 'Best candidate for 3D texture mapping and material studies',
  },

  // ================= MOTION REFERENCES =================
  {
    id: 'curtain-video-reference',
    filename: 'gemini_generated_video_0489906b.mp4',
    path: '/public/Refrence/The chef cafe/gemini_generated_video_0489906b.mp4',
    role: AssetRole.MOTION_REFERENCE,
    category: 'video',
    title: 'Generated Motion Video Reference',
    description: 'AI-generated motion study for curtain animation concept',
    metadata: {
      fileType: AssetFileType.VIDEO,
      fileSize: 1798066,
      fileSizeFormatted: '1.78MB',
      descriptiveTags: ['motion', 'animation', 'curtain', 'video'],
    },
    preferredUsage: ['motion-study', 'animation-reference', 'video-analysis'],
    qualityConcerns: 'AI-generated, may need quality refinement for final product',
    recommendations: 'Reference for motion timing and flow analysis',
  },

  // ================= ADDITIONAL WEBSITE CONTENT CANDIDATES =================
  {
    id: 'restaurant-story',
    filename: 'AHRPTWmgb5wnSO2EQ-Ai9Hs0diVwoQg34Tsz1FhjlAHD3JDt8WxtBUnUJEBlOobhHcfZnjaeoL2gM7P1XHiGl1zbweLt6upIt0L5007Se7ClJg67TTp2z3AUoj3eAJqLy3c-6p-5l0U9UKk7k4w',
    path: '/public/Refrence/The chef cafe/AHRPTWmgb5wnSO2EQ-Ai9Hs0diVwoQg34Tsz1FhjlAHD3JDt8WxtBUnUJEBlOobhHcfZnjaeoL2gM7P1XHiGl1zbweLt6upIt0L5007Se7ClJg67TTp2z3AUoj3eAJqLy3c-6p-5l0U9UKk7k4w',
    role: AssetRole.WEBSITE_CONTENT_CANDIDATE,
    category: 'story',
    title: 'Restaurant Ambience and Story Elements',
    description: 'Various images capturing restaurant atmosphere and story elements',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 4608, height: 2076 },
      aspectRatio: 4608 / 2076,
      fileSize: 9942542,
      fileSizeFormatted: '9.49MB',
      cameraInfo: 'vivo V23 5G',
      descriptiveTags: ['ambience', 'story', 'photography', 'color-reference'],
    },
    preferredUsage: ['hero-background', 'story-section', 'color-palette'],
    qualityConcerns: 'Largest file, beautiful color palette but consider compression',
    recommendations: 'Excellent hero background candidate and color palette reference',
  },

  // ================= OTHER CONTENT REFERENCES =================
  {
    id: 'curtain-concept',
    filename: 'download.jpg',
    path: '/public/Refrence/The chef cafe/download.jpg',
    role: AssetRole.VISUAL_REFERENCE,
    category: 'concept',
    title: 'Curtain Concept Reference',
    description: 'Simple concept image for curtain animation idea',
    metadata: {
      fileType: AssetFileType.JPEG,
      dimensions: { width: 736, height: 494 },
      aspectRatio: 736 / 494,
      fileSize: 21428,
      fileSizeFormatted: '21KB',
      descriptiveTags: ['concept', 'simple', 'curtain', 'lightweight'],
    },
    preferredUsage: ['concept-visualization', 'placeholder', 'small-asset'],
    qualityConcerns: 'Low resolution concept image, lightweight',
    recommendations: 'Use as placeholder or concept visualization only',
  },
]

// Helper function to get assets by role
export function getAssetsByRole(role: AssetRole): CatalogedAsset[] {
  return ASSET_CATALOG.filter(asset => asset.role === role)
}

// Helper function to get assets by category
export function getAssetsByCategory(category: string): CatalogedAsset[] {
  return ASSET_CATALOG.filter(asset => asset.category === category)
}

// Export summary statistics
export const ASSET_STATISTICS = {
  totalAssets: ASSET_CATALOG.length,
  byRole: ASSET_CATALOG.reduce((acc, asset) => {
    acc[asset.role] = (acc[asset.role] || 0) + 1
    return acc
  }, {} as Record<AssetRole, number>),
  byCategory: ASSET_CATALOG.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1
    return acc
  }, {} as Record<string, number>),
  totalFileSize: ASSET_CATALOG.reduce((acc, asset) => acc + asset.metadata.fileSize, 0),
  totalFileSizeFormatted: ASSET_CATALOG.reduce((acc, asset) => {
    const mb = asset.metadata.fileSize / (1024 * 1024)
    return acc + Math.round(mb * 100) / 100
  }, 0) + 'MB',
}