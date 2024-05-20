import { PointLike, RectangleLike } from '../../types'
import { Padding, PaddingParams } from './Padding'

export function innerRectangle<T extends RectangleLike>(
  outerRect: RectangleLike,
  innerAspect: number,
  sizeMode: "contain" | "cover",
  alignX: number,
  alignY: number,
  out: T,
): T {
  let innerWidth = 0
  let innerHeight = 0

  // Determine dimensions based on the chosen sizing strategy
  if (sizeMode === "contain") {
    if (outerRect.width / outerRect.height > innerAspect) {
      // Outer is wider relative to desired aspect
      innerHeight = outerRect.height
      innerWidth = innerHeight * innerAspect
    } else {
      innerWidth = outerRect.width
      innerHeight = innerWidth / innerAspect
    }
  } else if (sizeMode === "cover") {
    if (outerRect.width / outerRect.height < innerAspect) {
      // Outer is narrower relative to desired aspect
      innerHeight = outerRect.height
      innerWidth = innerHeight * innerAspect
    } else {
      innerWidth = outerRect.width
      innerHeight = innerWidth / innerAspect
    }
  }

  // Calculate centering position
  const innerX = outerRect.x + (outerRect.width - innerWidth) * alignX
  const innerY = outerRect.y + (outerRect.height - innerHeight) * alignY

  out.x = innerX
  out.y = innerY
  out.width = innerWidth
  out.height = innerHeight

  return out
}

/**
 * Very versatile and useful class for working with rectangles.
 * 
 * Features:
 * - alignment
 * - aspect ratio
 * - diagonal
 * - area
 * - padding
 * - inner rectangle
 * - relative coordinates
 * - uv coordinates
 * - contains methods
 */
export class Rectangle implements RectangleLike {
  static from(other: RectangleLike): Rectangle
  static from(params: { aspect: number, diagonal: number }): Rectangle
  static from(arg: any): Rectangle {
    if (typeof arg === 'object') {
      if ('aspect' in arg && 'diagonal' in arg) {
        const { aspect, diagonal } = arg
        return new Rectangle().setDiagonalAndAspect(diagonal, aspect)
      }

      if ('x' in arg && 'y' in arg && 'width' in arg && 'height' in arg) {
        return new Rectangle().copy(arg)
      }
    }
    throw new Error('Oops. Wrong parameters here.')
  }

  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0

  constructor()
  constructor(width: number, height: number)
  constructor(x: number, y: number, width: number, height: number)
  constructor(...args: any) {
    if (args.length > 0) {
      this.set.apply(this, args)
    }
  }

  *[Symbol.iterator](): Generator<number> {
    yield this.x
    yield this.y
    yield this.width
    yield this.height
  }

  copy(other: RectangleLike): this {
    this.x = other.x
    this.y = other.y
    this.width = other.width
    this.height = other.height
    return this
  }

  clone(): Rectangle {
    return new Rectangle().copy(this)
  }

  set(width: number, height: number): this
  set(x: number, y: number, width: number, height: number): this
  set(other: Rectangle): this
  set(...args: any): this {
    if (args.length === 4) {
      this.x = args[0]
      this.y = args[1]
      this.width = args[2]
      this.height = args[3]
      return this
    }
    if (args.length === 2) {
      this.width = args[0]
      this.height = args[1]
      return this
    }
    if (args.length === 1) {
      const [arg] = args
      if (arg instanceof Rectangle) {
        this.copy(arg)
      }
    }
    if (args.length === 0) {
      this.x = 0
      this.y = 0
      this.width = 0
      this.height = 0
      return this
    }
    throw new Error('Oops. Wrong parameters here.')
  }

  getCenterX() {
    return this.x + this.width / 2
  }

  setCenterX(value: number): this {
    this.x = value - this.width / 2
    return this
  }

  getCenterY() {
    return this.y + this.height / 2
  }

  setCenterY(value: number): this {
    this.y = value - this.height / 2
    return this
  }

  getCenter<T extends PointLike>(out: T = { x: 0, y: 0 } as T): T {
    out.x = this.getCenterX()
    out.y = this.getCenterY()
    return out
  }

  setCenter(point: PointLike): this {
    return (this
      .setCenterX(point.x)
      .setCenterY(point.y))
  }

  getLeft() {
    return this.x
  }

  setLeft(value: number): this {
    if (value > this.left) {
      this.width = 0
      this.x = value
    } else {
      this.width += this.x - value
      this.x = value
    }
    return this
  }

  getRight() {
    return this.x + this.width
  }

  setRight(value: number): this {
    if (value < this.x) {
      this.width = 0
      this.x = value
    } else {
      this.width = value - this.x
    }
    return this
  }

  getTop() {
    return this.y
  }

  setTop(value: number): this {
    if (value > this.y + this.height) {
      this.height = 0
      this.y = value
    } else {
      this.height += this.y - value
      this.y = value
    }
    return this
  }

  getBottom() {
    return this.y + this.height
  }

  setBottom(value: number): this {
    if (value < this.y) {
      this.height = 0
      this.y = value
    } else {
      this.height = value - this.y
    }
    return this
  }

  translate(x: number, y: number): this {
    this.x += x
    this.y += y
    return this
  }

  multiplyScalar(scalar: number): this {
    this.x *= scalar
    this.y *= scalar
    this.width *= scalar
    this.height *= scalar
    return this
  }

  multiply(scalarX: number, scalarY: number): this {
    this.x *= scalarX
    this.y *= scalarY
    this.width *= scalarX
    this.height *= scalarY
    return this
  }

  setPosition(x: number, y: number, align?: { x: number, y: number }): this {
    const alignX = align?.x ?? 0
    const alignY = align?.y ?? 0
    this.x = x - this.width * alignX
    this.y = y - this.height * alignY
    return this
  }

  setSize(width: number, height: number, align?: { x: number, y: number }): this {
    const alignX = align?.x ?? 0
    const alignY = align?.y ?? 0
    this.x += (this.width - width) * alignX
    this.y += (this.height - height) * alignY
    this.width = width
    this.height = height
    return this
  }

  /**
   * Resize the rectangle to fit a given area, keeping the aspect ratio.
   */
  setArea(value: number, align?: { x: number, y: number }): this {
    const scalar = Math.sqrt(value / this.area)
    const width = this.width * scalar
    const height = this.height * scalar
    return this.setSize(width, height, align)
  }

  setDiagonal(value: number, align?: { x: number, y: number }): this {
    const aspect = this.width / this.height
    const height = Math.sqrt(value ** 2 / (1 + aspect ** 2))
    const width = height * aspect
    return this.setSize(width, height, align)
  }

  setAspect(aspect: number, align?: { x: number, y: number }): this {
    const { diagonal } = this
    const height = Math.sqrt(diagonal ** 2 / (1 + aspect ** 2))
    const width = height * aspect
    return this.setSize(width, height, align)
  }

  setDiagonalAndAspect(diagonal: number, aspect: number, align?: { x: number, y: number }): this {
    const height = Math.sqrt(diagonal ** 2 / (1 + aspect ** 2))
    const width = height * aspect
    return this.setSize(width, height, align)
  }

  applyPadding(padding: PaddingParams, mode = <'shrink' | 'grow'>'shrink'): this {
    const { top, right, bottom, left } = Padding.ensure(padding)
    if (mode === 'shrink') {
      this.x += left
      this.y += top
      this.width -= left + right
      this.height -= top + bottom
    } else {
      this.x -= left
      this.y -= top
      this.width += left + right
      this.height += top + bottom
    }
    return this
  }

  innerRectangle({
    aspect = 1,
    sizeMode = 'contain',
    alignX = .5,
    alignY = .5,
    padding = 0,
  }: Partial<{
    aspect: number
    sizeMode: "contain" | "cover"
    alignX: number
    alignY: number
    padding: PaddingParams
  }>,
    out: Rectangle = new Rectangle(),
  ) {
    return innerRectangle(
      _rect.copy(this).applyPadding(padding),
      aspect, sizeMode, alignX, alignY, out)
  }

  /**
   * Very useful method to calculate, for example, the uv coordinates of a rectangle.
   */
  relativeTo(other: RectangleLike): this {
    this.x -= other.x
    this.y -= other.y
    this.x /= other.width
    this.y /= other.height
    this.width /= other.width
    this.height /= other.height
    return this
  }

  lerpRectangles(a: RectangleLike, b: RectangleLike, t: number): this {
    this.x = a.x + (b.x - a.x) * t
    this.y = a.y + (b.y - a.y) * t
    this.width = a.width + (b.width - a.width) * t
    this.height = a.height + (b.height - a.height) * t
    return this
  }

  lerp(other: RectangleLike, t: number): this {
    return this.lerpRectangles(this, other, t)
  }

  containsXY(x: number, y: number): boolean {
    return x >= this.x
      && x < this.x + this.width
      && y >= this.y
      && y < this.y + this.height
  }

  containsPoint(point: { x: number, y: number }): boolean {
    return this.containsXY(point.x, point.y)
  }

  containsRect(other: RectangleLike): boolean {
    return other.x >= this.x
      && other.y >= this.y
      && other.x + other.width <= this.x + this.width
      && other.y + other.height <= this.y + this.height
  }

  /**
   * Readable / declarative method that can be called with different parameters:
   * contains(x, y) -> containsXY(x, y)
   * contains([x, y]) -> containsXY(x, y)
   * contains(point) -> containsPoint(point)
   * contains(rect) -> containsRect(rect)
   */
  contains(x: number, y: number): boolean
  contains(other: PointLike): boolean
  contains(other: RectangleLike): boolean
  contains(...args: any[]): boolean {
    if (args.length === 2) {
      const [x, y] = args
      return this.containsXY(x, y)
    }
    if (args.length === 1) {
      const [arg] = args
      if (Array.isArray(arg)) {
        const [x, y] = arg
        return this.containsXY(x, y)
      }
      if (typeof arg === 'object') {
        // Duck typing
        if ('x' in arg && 'y' in arg) {
          // In Three.js, Vector2 has "width" and "height" aliases, so duck typing 
          // is not reliable here. Instead, we check for the constructor name.
          if (/vector2|point/.test(arg.constructor.name)) {
            return this.containsPoint(arg)
          }
          if ('width' in arg && 'height' in arg) {
            return this.containsRect(arg)
          }
          return this.containsPoint(arg)
        }
      }
    }
    throw new Error('Oops. Wrong parameters here.')
  }

  uv<T extends PointLike = PointLike>({ x, y }: T, out?: T): T {
    out ??= { x: 0, y: 0 } as T
    out.x = (x - this.x) / this.width
    out.y = (y - this.y) / this.height
    return out
  }

  // Sugar:
  get centerX() {
    return this.getCenterX()
  }
  set centerX(value: number) {
    this.setCenterX(value)
  }

  get centerY() {
    return this.getCenterY()
  }
  set centerY(value: number) {
    this.setCenterY(value)
  }

  get left() {
    return this.getLeft()
  }
  set left(value: number) {
    this.setLeft(value)
  }

  get right() {
    return this.getRight()
  }
  set right(value: number) {
    this.setRight(value)
  }

  get top() {
    return this.getTop()
  }
  set top(value: number) {
    this.setTop(value)
  }

  get bottom() {
    return this.getBottom()
  }
  set bottom(value: number) {
    this.setBottom(value)
  }

  get area() {
    return this.width * this.height
  }
  set area(value: number) {
    this.setArea(value)
  }

  get diagonal() {
    return Math.sqrt(this.width ** 2 + this.height ** 2)
  }
  set diagonal(value: number) {
    this.setDiagonal(value)
  }

  get aspect() {
    return this.width / this.height
  }
  set aspect(value: number) {
    this.setAspect(value)
  }
}

const _rect = new Rectangle()

