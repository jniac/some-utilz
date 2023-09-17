
type BasicPointerInfo = {
  entered: boolean
  pressed: boolean
  position: DOMPoint
  downPosition: DOMPoint
  upPosition: DOMPoint
}

type Callback = (info: BasicPointerInfo) => void

const defaultParams = {
}

const callbackNames = [
  'onDown',
  'onUp',
  'onChange',
  'onEnter',
  'onLeave',
] as const

type CallbackName = (typeof callbackNames)[number]

type Params = Partial<typeof defaultParams & Record<CallbackName, Callback>>

function hasBasicPointerCallback(params: Record<string, any>): boolean {
  return callbackNames.some(name => name in params)
}

/**
 * MEMO:
 *  - "pointer" events are fire BEFORE any "mouse" or "touch" events.
 * 
 * For multiple reasons related to the "mouse" & "touch" reunification, 
 * "mouse" & "touch" are handled separately (that is to say: not through the 
 * common "pointer" interface). 
 * 
 * Reasons are:
 * - when tracking pointer position "onChange" callback is better than an "onMove"
 *   because "onMove" (onMouseMove + onPointerMove) is not fired when a new touch 
 *   started (but a new touch start implies generally a new position).
 * - "onChange" has to be called before "onDown" (ex: for updating a raycaster), 
 *   so this requires to use the "mousedown" & "touchstart" and not "pointer" 
 *   since ("pointer" are fired first, "touchstart" will necesseray be late).
 */
function handleBasicPointer(element: HTMLElement, params: Params): () => void {
  const info: BasicPointerInfo = {
    pressed: false,
    entered: false,
    position: new DOMPoint(),
    downPosition: new DOMPoint(),
    upPosition: new DOMPoint(),
  }

  // INFO UPDATE:
  const updateDown = (x: number, y: number) => {
    info.pressed = true
    info.downPosition.x = x
    info.downPosition.y = y
    update(x, y)
    params.onDown?.(info)
  }

  const updateUp = (x: number, y: number) => {
    info.pressed = false
    info.upPosition.x = x
    info.upPosition.y = y
    update(x, y)
    params.onUp?.(info)
  }

  const update = (x: number, y: number) => {
    if (info.position.x !== x && info.position.y !== y) {
      info.position.x = x
      info.position.y = y
      params.onChange?.(info)
    }
  }

  // MOUSE:
  const onMouseDown = (event: MouseEvent) => {
    updateDown(event.clientX, event.clientY)
  }

  const onMouseUp = (event: MouseEvent) => {
    updateUp(event.clientX, event.clientY)
  }
  
  const onMouseMove = (event: MouseEvent) => {
    update(event.clientX, event.clientY)
  }

  const onMouseOver = () => {
    document.body.addEventListener('mouseup', onBodyMouseUp)
    checkForEnter()
  }

  const onMouseOut = () => {
    checkForLeave()
  }

  const onBodyMouseUp = () => {
    info.pressed = false
    checkForLeave()
    document.documentElement.removeEventListener('mouseup', onBodyMouseUp)
  }

  const checkForEnter = () => {
    if (info.entered === false) {
      info.entered = true
      params.onEnter?.(info)
    }
  }

  const checkForLeave = () => {
    if (info.entered) {
      if (info.pressed === false) {
        info.entered = false
        params.onLeave?.(info)
      }
    }
  }

  // TOUCH:
  const onTouchStart = (event: TouchEvent) => {
    // Because when the touch start the position is not the same as the previous touch.
    if (event.touches.length === 1) { // ignore multi-touch
      updateDown(event.touches[0].clientX, event.touches[0].clientY)
    }
  }
  
  const onTouchEnd = (event: TouchEvent) => {
    if (event.touches.length === 0) { // ignore multi-touch
      updateUp(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    }
  }

  const onTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 1) { // ignore multi-touch
      update(event.touches[0].clientX, event.touches[0].clientY)
    }
  }

  // EVENTS:
  element.addEventListener('mouseover', onMouseOver)
  element.addEventListener('mouseout', onMouseOut)
  element.addEventListener('mousedown', onMouseDown)
  element.addEventListener('mouseup', onMouseUp)
  element.addEventListener('mousemove', onMouseMove)

  element.addEventListener('touchstart', onTouchStart)
  element.addEventListener('touchend', onTouchEnd)
  element.addEventListener('touchmove', onTouchMove)
  
  return () => {
    element.removeEventListener('mouseover', onMouseOver)
    element.removeEventListener('mouseout', onMouseOut)
    element.removeEventListener('mousedown', onMouseDown)
    element.removeEventListener('mouseup', onMouseUp)
    element.removeEventListener('mousemove', onMouseMove)
    
    element.removeEventListener('touchstart', onTouchStart)
    element.removeEventListener('touchend', onTouchEnd)
    element.removeEventListener('touchmove', onTouchMove)

    document.body.removeEventListener('mouseup', onBodyMouseUp)
  }
}

export type {
  Params as HandleBasicPointerParams,
  BasicPointerInfo,
}

export {
  handleBasicPointer,
  hasBasicPointerCallback,
}