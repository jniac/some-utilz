import { HandleBasicPointerParams, handleBasicPointer, hasBasicPointerCallback } from './basic'
import { HandleDragParams, handleDrag, hasDragCallback } from './drag'
import { HandleFocusParams, handleFocus, hasFocusCallback } from './focus'
import { HandlePressParams, handlePress, hasPressCallback } from './press'
import { HandleTapParams, handleTap, hasTapCallback } from './tap'
import { PointerTarget } from './type'
import { HandleWheelParams, handleWheel, hasWheelCallback } from './wheel'
import { HandleWheelFrameParams, handleWheelFrame, hasWheelFrameCallback } from './wheel.frame'

type Params =
  & HandleBasicPointerParams
  & HandleDragParams
  & HandleFocusParams
  & HandlePressParams
  & HandleTapParams
  & HandleWheelParams
  & HandleWheelFrameParams

export function handlePointer(target: PointerTarget | PointerTarget[] | NodeListOf<PointerTarget>, params: Params): () => void {
  const destroyCallbacks: (() => void)[] = []

  const targets = 'length' in target ? Array.from(target) : [target]
  for (const target of targets) {
    if (hasBasicPointerCallback(params)) {
      destroyCallbacks.push(handleBasicPointer(target, params))
    }
    if (hasDragCallback(params)) {
      destroyCallbacks.push(handleDrag(target, params))
    }
    if (hasFocusCallback(params)) {
      destroyCallbacks.push(handleFocus(target, params))
    }
    if (hasPressCallback(params)) {
      destroyCallbacks.push(handlePress(target, params))
    }
    if (hasTapCallback(params)) {
      destroyCallbacks.push(handleTap(target, params))
    }
    if (hasWheelCallback(params)) {
      destroyCallbacks.push(handleWheel(target, params))
    }
    if (hasWheelFrameCallback(params)) {
      destroyCallbacks.push(handleWheelFrame(target, params))
    }
  }

  return () => {
    for (const callback of destroyCallbacks) {
      callback()
    }
  }
}

export { PointerButton } from './type'

