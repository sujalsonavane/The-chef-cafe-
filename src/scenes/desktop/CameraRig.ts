import * as THREE from 'three'
import { SCENE_CONFIG } from './sceneConfig'

export class CameraRig {
  public camera: THREE.PerspectiveCamera

  constructor(aspect: number) {
    this.camera = new THREE.PerspectiveCamera(
      SCENE_CONFIG.camera.fov,
      aspect,
      SCENE_CONFIG.camera.near,
      SCENE_CONFIG.camera.far
    )
    this.reset()
  }

  public reset(): void {
    this.camera.position.set(0, 0, SCENE_CONFIG.camera.startZ)
    this.camera.lookAt(0, 0, SCENE_CONFIG.camera.lookAtZ)
  }

  public updateAspect(aspect: number): void {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  public update(): void {
    // Keep camera facing straight ahead down the central opening
    this.camera.lookAt(0, 0, SCENE_CONFIG.camera.lookAtZ)
  }
}
