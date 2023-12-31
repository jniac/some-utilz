import { Object3D, PerspectiveCamera, Vector2, Vector3 } from 'three'
import { Vector3Declaration, solveVector3Declaration } from '../declaration'
import { VertigoState, VertigoStateDeclaration, copyVertigoState, defaultVertigoState, solveVertigoStateDeclaration } from './state'
import { updateVertigoCamera, updateVertigoSize } from './update'

import { Rectangle } from '../../../math/geom/Rectangle'

export class VertigoCamera extends PerspectiveCamera {
  vertigoSize: Vector2 = new Vector2()
  vertigo: VertigoState = { ...defaultVertigoState }

  setVertigo(vertigoProps: VertigoStateDeclaration): this {
    Object.assign(this.vertigo, solveVertigoStateDeclaration(vertigoProps, this.vertigo))
    return this
  }

  setVertigoFocus(focusX: number, focusY: number, focusZ: number): this
  setVertigoFocus(target: Vector3Declaration | Object3D): this
  setVertigoFocus(...args: any[]): this {
    if (args.length === 3) {
      const [focusX, focusY, focusZ] = args
      this.vertigo.focusX = focusX
      this.vertigo.focusY = focusY
      this.vertigo.focusZ = focusZ
    } else {
      const [arg] = args as [Vector3 | Object3D]
      const [x, y, z] = solveVector3Declaration('position' in arg ? arg.position : arg)
      this.vertigo.focusX = x
      this.vertigo.focusY = y
      this.vertigo.focusZ = z
    }
    return this
  }

  copy(source: this, recursive?: boolean | undefined): this {
    super.copy(this, recursive)
    copyVertigoState(source.vertigo, this.vertigo)
    return this
  }

  cloneAsVertigoCamera(): VertigoCamera {
    return new VertigoCamera().copy(this)
  }

  updateVertigoCamera(aspect: number): this {
    updateVertigoSize(this.vertigoSize, aspect, this.vertigo)
    updateVertigoCamera(this, this.vertigoSize, this.vertigo)
    return this
  }

  getVertigoRect(element: Element, canvas: Element): Rectangle {
    const elementRect = element.getBoundingClientRect()
    const canvasRect = canvas.getBoundingClientRect()
    const [vertigoWidth, vertigoHeight] = this.vertigoSize
    const width = vertigoWidth * elementRect.width / canvasRect.width
    const height = vertigoHeight * elementRect.height / canvasRect.height
    const x = vertigoWidth * ((elementRect.x - canvasRect.x) / canvasRect.width - .5)
    const y = vertigoHeight * (-((elementRect.y + elementRect.height) - canvasRect.y) / canvasRect.height + .5)
    return new Rectangle(x, y, width, height)
  }
}