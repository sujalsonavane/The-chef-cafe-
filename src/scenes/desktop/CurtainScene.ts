import * as THREE from 'three'
import { SCENE_CONFIG } from './sceneConfig'
import { CurtainPanels } from './CurtainPanels'
import { CameraRig } from './CameraRig'

export interface CurtainSceneOptions {
  onTextureLoaded?: () => void
}

export class CurtainScene {
  public scene: THREE.Scene
  public renderer: THREE.WebGLRenderer
  public cameraRig: CameraRig
  public curtainPanels: CurtainPanels

  private animFrameId: number | null = null
  private floorMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>
  private isDisposed: boolean = false

  constructor(container: HTMLElement, options?: CurtainSceneOptions) {
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // 1. Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(SCENE_CONFIG.colors.background)
    this.scene.fog = new THREE.Fog(SCENE_CONFIG.colors.background, 6, 20)

    // 2. Camera Rig
    this.cameraRig = new CameraRig(width / height)

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0
    container.appendChild(this.renderer.domElement)

    // 4. Lighting
    this.setupLighting()

    // 5. Floor (subtle, dark, minimal)
    const floorGeo = new THREE.PlaneGeometry(40, 40)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c10,
      roughness: 0.75,
      metalness: 0.2,
    })
    this.floorMesh = new THREE.Mesh(floorGeo, floorMat)
    this.floorMesh.rotation.x = -Math.PI / 2
    this.floorMesh.position.y = -1.8
    this.floorMesh.position.z = -5
    this.scene.add(this.floorMesh)

    // 6. Curtain Panels
    this.curtainPanels = new CurtainPanels(this.cameraRig.camera, () => {
      if (!this.isDisposed) {
        options?.onTextureLoaded?.()
      }
    })
    this.scene.add(this.curtainPanels.group)

    // 7. Start render loop
    this.render = this.render.bind(this)
    this.startLoop()
  }

  private interiorLight: THREE.PointLight | null = null

  private setupLighting(): void {
    // Ambient light - maintains rich color of red curtain fabric
    const ambientLight = new THREE.AmbientLight(SCENE_CONFIG.colors.ambientLight, 1.3)
    this.scene.add(ambientLight)

    // Key directional light - highlights the vertical drapery folds
    const keyLight = new THREE.DirectionalLight(SCENE_CONFIG.colors.keyLight, 1.4)
    keyLight.position.set(3, 4, 6)
    this.scene.add(keyLight)

    // Fill light - deep warm crimson from the opposite side
    const fillLight = new THREE.DirectionalLight(SCENE_CONFIG.colors.rimLight, 0.7)
    fillLight.position.set(-4, -1, 4)
    this.scene.add(fillLight)

    // Subtle warm interior point light behind curtain
    this.interiorLight = new THREE.PointLight(0xd97706, 0.6, 14)
    this.interiorLight.position.set(0, 0, -3.5)
    this.scene.add(this.interiorLight)
  }

  /**
   * Adjusts the warm interior atmosphere as the camera passes through the curtain.
   */
  public setAtmosphereWarmth(warmth: number): void {
    const w = Math.max(0, Math.min(1, warmth))
    if (this.interiorLight) {
      this.interiorLight.intensity = 0.6 + w * 1.4
    }
  }

  private startLoop(): void {
    if (this.animFrameId !== null) return
    const loop = () => {
      if (this.isDisposed) return
      this.render()
      this.animFrameId = requestAnimationFrame(loop)
    }
    this.animFrameId = requestAnimationFrame(loop)
  }

  public render(): void {
    this.cameraRig.update()
    this.renderer.render(this.scene, this.cameraRig.camera)
  }

  public resize(width: number, height: number): void {
    if (this.isDisposed || height === 0) return
    this.cameraRig.updateAspect(width / height)
    this.curtainPanels.resize(this.cameraRig.camera)
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.render()
  }

  public dispose(): void {
    this.isDisposed = true

    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }

    // Dispose curtain panels
    this.curtainPanels.dispose()
    this.scene.remove(this.curtainPanels.group)

    // Dispose floor
    this.floorMesh.geometry.dispose()
    this.floorMesh.material.dispose()
    this.scene.remove(this.floorMesh)

    // Remove DOM element
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
    }

    // Dispose renderer
    this.renderer.dispose()
  }
}
