const PERSPECTIVE_ONE = .8

enum SIZE_MODE {
  CONTAIN = 1,
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
  rangeMax: 10_000,
  nearMin: .01,
  farMax: 100_000,

  fovEpsilon: 1 * Math.PI / 180,
}

type VertigoState = typeof defaultVertigoState

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
}

export {
  PERSPECTIVE_ONE,
  SIZE_MODE,
  defaultVertigoState,
  copyVertigoState,
}
