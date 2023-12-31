import { Vector3Declaration, Vector2Declaration, solveVector3Declaration, solveVector2Declaration } from '../declaration'

const PERSPECTIVE_ONE = .8

enum SIZE_MODE {
  CONTAIN = 0,
  COVER = 1,
}

const defaultVertigoState = {
  /**
   * The "quantity" of perspective.  
   * - 0: no perspective (orthographic projection)
   * - 1: "normal" perspective (which depends from PERSPECTIVE_ONE constant)
   */
  perspective: 1,

  focusX: 0,
  focusY: 0,
  focusZ: 0,

  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,

  width: 10,
  height: 10,

  sizeMode: SIZE_MODE.CONTAIN,

  rangeMin: -1_000,
  rangeMax: 1_000,
  nearMin: .01,
  farMax: 100_000,

  fovEpsilon: 1 * Math.PI / 180,
}

type VertigoState = typeof defaultVertigoState

type VertigoStateDeclaration = Partial<VertigoState & {
  focus: Vector3Declaration
  rotation: Vector3Declaration
  size: Vector2Declaration
  yaw: number
  pitch: number
  roll: number
  useDegree: boolean
}>

function solveVertigoStateDeclaration(arg: VertigoStateDeclaration, _defaultVertigoState: VertigoState = defaultVertigoState): VertigoState {
  const {
    focus,
    rotation,
    size,
    yaw,
    pitch,
    roll,
    useDegree = false,
    ...props
  } = arg
  const state = {
    ..._defaultVertigoState,
    ...props
  }
  if (focus) {
    const { x, y, z } = solveVector3Declaration(focus)
    state.focusX = x
    state.focusY = y
    state.focusZ = z
  }
  if (rotation) {
    const { x, y, z } = solveVector3Declaration(rotation)
    state.rotationX = x
    state.rotationY = y
    state.rotationZ = z
  }
  if (size) {
    const { x, y } = solveVector2Declaration(size)
    state.width = x
    state.height = y
  }
  if (yaw !== undefined) {
    state.rotationY = yaw
  }
  if (pitch !== undefined) {
    state.rotationX = pitch
  }
  if (roll !== undefined) {
    state.rotationZ = roll
  }
  if (useDegree) {
    state.rotationX *= Math.PI / 180
    state.rotationY *= Math.PI / 180
    state.rotationZ *= Math.PI / 180
  }
  return state
}

function copyVertigoState(source: VertigoState, target: VertigoState) {
  target.perspective = source.perspective
  target.focusX = source.focusX
  target.focusY = source.focusY
  target.focusZ = source.focusZ
  target.rotationX = source.rotationX
  target.rotationY = source.rotationY
  target.rotationZ = source.rotationZ
  target.width = source.width
  target.height = source.height
  target.sizeMode = source.sizeMode
  target.rangeMin = source.rangeMin
  target.rangeMax = source.rangeMax
  target.nearMin = source.nearMin
  target.farMax = source.farMax
  target.fovEpsilon = source.fovEpsilon
}

export type {
  VertigoState,
  VertigoStateDeclaration,
}

export {
  PERSPECTIVE_ONE,
  SIZE_MODE,
  defaultVertigoState,
  copyVertigoState,
  solveVertigoStateDeclaration,
}
