import * as THREE from 'three'
import { SCENE_CONFIG } from './sceneConfig'

export class CurtainPanels {
  public group: THREE.Group
  public leftMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>
  public rightMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>
  public openProgress: number = 0

  private texture: THREE.Texture | null = null
  private material: THREE.MeshStandardMaterial
  private panelWidth: number = 0
  private panelHeight: number = 0

  // Cached base vertex positions for deformation
  private leftBasePositions: Float32Array | null = null
  private rightBasePositions: Float32Array | null = null

  constructor(camera: THREE.PerspectiveCamera, onLoaded?: () => void) {
    this.group = new THREE.Group()

    // Initialize velvet material with subtle sheen
    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.72,
      metalness: 0.08,
      side: THREE.DoubleSide,
    })

    // Load curtain texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      SCENE_CONFIG.texturePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        this.texture = texture
        this.material.map = texture
        this.material.needsUpdate = true
        onLoaded?.()
      },
      undefined,
      (err) => {
        console.error('Failed to load curtain texture:', err)
      }
    )

    // Calculate dimensions
    this.calculateDimensions(camera)

    // Create geometries and meshes with high horizontal segmentation (64x16)
    const leftGeo = this.createLeftGeometry()
    const rightGeo = this.createRightGeometry()

    this.leftMesh = new THREE.Mesh(leftGeo, this.material)
    this.rightMesh = new THREE.Mesh(rightGeo, this.material)

    this.group.add(this.leftMesh)
    this.group.add(this.rightMesh)

    this.applyDeformationAndPositions()
  }

  private calculateDimensions(camera: THREE.PerspectiveCamera): void {
    const vFov = (camera.fov * Math.PI) / 180
    const visibleHeight = 2 * Math.tan(vFov / 2) * SCENE_CONFIG.camera.startZ
    const visibleWidth = visibleHeight * camera.aspect

    const totalWidth = visibleWidth * SCENE_CONFIG.curtain.coverageMultiplier
    const totalHeight = visibleHeight * SCENE_CONFIG.curtain.coverageMultiplier

    this.panelWidth = totalWidth / 2
    this.panelHeight = totalHeight
  }

  private createLeftGeometry(): THREE.PlaneGeometry {
    // 64 segments horizontally for smooth sinusoidal folds & bunching, 16 vertically
    const geo = new THREE.PlaneGeometry(this.panelWidth, this.panelHeight, 64, 16)
    const uv = geo.attributes.uv
    const { uvMarginX, uvMarginY } = SCENE_CONFIG.curtain

    for (let i = 0; i < uv.count; i++) {
      const origU = uv.getX(i)
      const origV = uv.getY(i)
      const newU = uvMarginX + origU * (0.5 - uvMarginX)
      const newV = uvMarginY + origV * (1.0 - 2 * uvMarginY)
      uv.setXY(i, newU, newV)
    }
    uv.needsUpdate = true

    // Cache initial flat base positions
    this.leftBasePositions = new Float32Array(geo.attributes.position.array)
    return geo
  }

  private createRightGeometry(): THREE.PlaneGeometry {
    const geo = new THREE.PlaneGeometry(this.panelWidth, this.panelHeight, 64, 16)
    const uv = geo.attributes.uv
    const { uvMarginX, uvMarginY } = SCENE_CONFIG.curtain

    for (let i = 0; i < uv.count; i++) {
      const origU = uv.getX(i)
      const origV = uv.getY(i)
      const newU = 0.5 + origU * (1.0 - uvMarginX - 0.5)
      const newV = uvMarginY + origV * (1.0 - 2 * uvMarginY)
      uv.setXY(i, newU, newV)
    }
    uv.needsUpdate = true

    // Cache initial flat base positions
    this.rightBasePositions = new Float32Array(geo.attributes.position.array)
    return geo
  }

  /**
   * Applies realistic physical bunching, sinusoidal drapery depth,
   * backward edge curl, and horizontal translation to both curtain panels.
   */
  public applyDeformationAndPositions(): void {
    const p = this.openProgress
    const openDist = this.panelWidth * SCENE_CONFIG.curtain.openDistanceMultiplier
    const slide = p * openDist

    // Base position of mesh centers
    this.leftMesh.position.set(-this.panelWidth / 2 - slide, 0, 0)
    this.rightMesh.position.set(this.panelWidth / 2 + slide, 0, 0)

    const baseFoldAmplitude = 0.09
    const foldWaveCount = 7 // 7 complete waves across panel width (zero at both seams)

    // 1. Deform Left Panel
    if (this.leftBasePositions && this.leftMesh.geometry) {
      const posAttr = this.leftMesh.geometry.attributes.position
      const count = posAttr.count
      const base = this.leftBasePositions

      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const baseX = base[i3]
        const baseY = base[i3 + 1]

        // u: 0.0 at outer left edge (fixed side), 1.0 at inner parting edge (center)
        const u = (baseX + this.panelWidth / 2) / this.panelWidth

        // Bunching compression: vertices gather progressively tighter toward outer edge
        const bunchCompression = 1 - p * 0.32 * (1 - u * 0.45)
        const bunchedU = u * bunchCompression
        const displacedX = -this.panelWidth / 2 + bunchedU * this.panelWidth

        // Sinusoidal drapery fold with increased depth as bunching occurs
        const foldDepth = (baseFoldAmplitude + p * 0.07 * (1 - u * 0.6)) * Math.sin(foldWaveCount * 2 * Math.PI * bunchedU)

        // Subtle backward hem curl on inner parting edge (leading edge curves backward into opening)
        const hemCurl = -0.18 * p * Math.exp(-Math.pow((1 - u) / 0.14, 2))

        // Natural vertical drape sag as fabric gathers
        const drapeSag = -0.025 * p * (1 - u) * Math.sin(u * Math.PI)

        posAttr.setXYZ(i, displacedX, baseY + drapeSag, foldDepth + hemCurl)
      }

      posAttr.needsUpdate = true
      this.leftMesh.geometry.computeVertexNormals()
    }

    // 2. Deform Right Panel (symmetrical)
    if (this.rightBasePositions && this.rightMesh.geometry) {
      const posAttr = this.rightMesh.geometry.attributes.position
      const count = posAttr.count
      const base = this.rightBasePositions

      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const baseX = base[i3]
        const baseY = base[i3 + 1]

        // u: 0.0 at outer right edge (fixed side), 1.0 at inner parting edge (center)
        const u = (this.panelWidth / 2 - baseX) / this.panelWidth

        // Bunching compression toward outer right edge
        const bunchCompression = 1 - p * 0.32 * (1 - u * 0.45)
        const bunchedU = u * bunchCompression
        const displacedX = this.panelWidth / 2 - bunchedU * this.panelWidth

        // Symmetrical sinusoidal drapery fold
        const foldDepth = (baseFoldAmplitude + p * 0.07 * (1 - u * 0.6)) * Math.sin(foldWaveCount * 2 * Math.PI * bunchedU)

        // Backward hem curl on inner parting edge
        const hemCurl = -0.18 * p * Math.exp(-Math.pow((1 - u) / 0.14, 2))

        // Natural vertical drape sag
        const drapeSag = -0.025 * p * (1 - u) * Math.sin(u * Math.PI)

        posAttr.setXYZ(i, displacedX, baseY + drapeSag, foldDepth + hemCurl)
      }

      posAttr.needsUpdate = true
      this.rightMesh.geometry.computeVertexNormals()
    }
  }

  public setOpenProgress(progress: number): void {
    this.openProgress = Math.max(0, Math.min(1, progress))
    this.applyDeformationAndPositions()
  }

  public resize(camera: THREE.PerspectiveCamera): void {
    this.calculateDimensions(camera)

    this.leftMesh.geometry.dispose()
    this.leftMesh.geometry = this.createLeftGeometry()

    this.rightMesh.geometry.dispose()
    this.rightMesh.geometry = this.createRightGeometry()

    this.applyDeformationAndPositions()
  }

  public dispose(): void {
    this.leftMesh.geometry.dispose()
    this.rightMesh.geometry.dispose()
    this.material.dispose()
    if (this.texture) {
      this.texture.dispose()
      this.texture = null
    }
  }
}
