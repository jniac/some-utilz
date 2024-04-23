import { Rectangle } from '../../math/geom/Rectangle'

import { Scalar, ScalarDeclaration, ScalarType } from './Scalar'
import { computeChildrenRect, computeRootRect } from './Space.layout'
import { Direction } from './types'

/**
 * `some-utilz/layout/flex` is a naive yet robust flex layout system.
 * 
 * It does NOT implement the [official W3C specs](https://www.w3.org/TR/css-flexbox-1/).
 * 
 * It's intended to be used in creative coding projects where you need to create
 * complex layouts with relative and absolute sizes, paddings and gaps.
 * 
 * ## Features:
 * - Horizontal and vertical directions
 * - Absolute and relative sizes
 *   - Absolute: fixed size in pixels
 *   - Relative: size based on the parent size
 *   - Special relative sizes that take the two parent sizes into account: opposite, smaller, larger
 * - Padding and gaps
 * - Part unit for relative sizes
 * - Layout computation (from root to children)
 * - Tree structure
 *   - add
 *   - remove
 *   - get (with index path)
 *   - find (with predicate)
 * - Declarative syntax for sizes, paddings and gaps
 * 
 * ## Exclusive features:
 * - Extra size (extraSizeX, extraSizeY)  
 *   It's motion design friendly feature. You can animate the size of a space 
 *   based on its current size. It's useful for creating animations where a space
 *   could grow or shrink. The whole layout will be affected by this change 
 *   accordingly to the space's direction and alignment.
 * 
 * ## Roadmap:
 * - Min and max sizes
 * - Shrinking options?
 * 
 * Naive implementation of a flex layout system. Naive but robust. Useful for 
 * creating simple layouts with relative and absolute sizes, paddings and gaps 
 * that could be easily computed, animated and rendered.
 * 
 * ## Usage:
 * ```js
 * const root = new Space(Direction.Horizontal)
 *   .setOffset(100, 100)
 *   .setSize(600, 400)
 *   .setPadding(10)
 *   .setGap(10)
 * 
 * // Creates 2 vertical spaces with 25% width and 100% height
 * root.add(new Space(Direction.Vertical).setSize('.25rel', '1rel').setSpacing(10).setUserData({ color: '#f00' }))
 * root.add(new Space(Direction.Vertical).setSize('.25rel', '1rel').setSpacing(10).setUserData({ color: '#f00' }))
 * root.add(new Space(Direction.Vertical).setSize('.25rel', '1rel').setSpacing(10).setUserData({ color: '#f00' }))
 * 
 * // Creates 3 spaces into the first vertical space, with 1prt, 2prt and 3prt height
 * // where prt is a special unit that means "part" of the remaining space
 * for (let i = 0; i < 3; i++) {
 *   root.getChild(0)!
 *     .add(new Space().setSize(`1rel`, `${i + 1}prt`).setSpacing(10))
 * }
 * 
 * const ctx = canvas.getContext('2d')!
 * for (const space of root.allDescendants()) {
 *   ctx.strokeStyle = space.userData.color ?? '#fff'
 *   ctx.strokeRect(space.layoutRect.x, space.layoutRect.y, space.layoutRect.width, space.layoutRect.height)
 * }
 * ```
 */
export class Space {
  direction: Direction

  root: Space
  parent: Space | null = null
  children: Space[] = []

  offsetX = new Scalar(0, ScalarType.Absolute)
  offsetY = new Scalar(0, ScalarType.Absolute)
  sizeX = new Scalar(1, ScalarType.Part)
  sizeY = new Scalar(1, ScalarType.Part)

  extraSizeX = new Scalar(1, ScalarType.Relative)
  extraSizeY = new Scalar(1, ScalarType.Relative)

  padding: [top: Scalar, right: Scalar, bottom: Scalar, left: Scalar] = [
    new Scalar(0, ScalarType.Absolute),
    new Scalar(0, ScalarType.Absolute),
    new Scalar(0, ScalarType.Absolute),
    new Scalar(0, ScalarType.Absolute),
  ]

  gap: Scalar = new Scalar(0, ScalarType.Absolute)

  alignX: number = .5
  alignY: number = .5

  rect = new Rectangle()

  userData: Record<string, any> = {}

  constructor(direction: Direction = Direction.Horizontal) {
    this.direction = direction
    this.root = this
  }

  isRoot(): boolean {
    return this.root === this
  }

  *allDescendants({ includeSelf = true } = {}): Generator<Space> {
    if (includeSelf) {
      yield this
    }
    for (const child of this.children) {
      yield* child.allDescendants({ includeSelf: true })
    }
  }

  get(...indexes: number[]): Space | null {
    let current: Space = this
    for (const index of indexes) {
      current = current.children[index]
      if (!current) {
        return null
      }
    }
    return current
  }

  find(predicate: (space: Space) => boolean, { includeSelf = true } = {}): Space | null {
    for (const space of this.allDescendants({ includeSelf })) {
      if (predicate(space)) {
        return space
      }
    }
    return null
  }

  *findAll(predicate: (space: Space) => boolean, { includeSelf = true } = {}): Generator<Space> {
    for (const space of this.allDescendants({ includeSelf })) {
      if (predicate(space)) {
        yield space
      }
    }
  }

  add(...spaces: Space[]): this {
    for (const space of spaces) {
      space.parent = this
      space.root = this.root
      this.children.push(space)
    }
    return this
  }

  removeFromParent(): this {
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1)
      this.parent = null
      this.root = this
    }
    return this
  }

  remove(...spaces: Space[]): this {
    for (const space of spaces) {
      if (space.parent === this) {
        space.removeFromParent()
      }
    }
    return this
  }

  setOffset(x: ScalarDeclaration, y: ScalarDeclaration): this {
    this.offsetX.parse(x)
    this.offsetY.parse(y)
    return this
  }

  setSize(x: ScalarDeclaration, y: ScalarDeclaration = x): this {
    this.sizeX.parse(x)
    this.sizeY.parse(y)
    return this
  }

  setUserData(props: Record<string, any>): this {
    Object.assign(this.userData, props)
    return this
  }

  setPadding(all: ScalarDeclaration): this
  setPadding(vertical: ScalarDeclaration, horizontal: ScalarDeclaration): this
  setPadding(top: ScalarDeclaration, right: ScalarDeclaration, bottom: ScalarDeclaration, left: ScalarDeclaration): this
  setPadding(...args: any[]): this {
    function solveArgs(args: any[]) {
      if (args.length === 1) {
        return [args[0], args[0], args[0], args[0]]
      } else if (args.length === 2) {
        return [args[0], args[1], args[0], args[1]]
      } else if (args.length === 4) {
        return args
      }
      throw new Error('Invalid number of arguments')
    }
    const [top, right, bottom, left] = solveArgs(args)
    this.padding[0].parse(top)
    this.padding[1].parse(right)
    this.padding[2].parse(bottom)
    this.padding[3].parse(left)
    return this
  }

  setGap(value: ScalarDeclaration): this {
    this.gap.parse(value)
    return this
  }

  setSpacing(all: ScalarDeclaration): this
  setSpacing(gap: ScalarDeclaration, padding: ScalarDeclaration): this
  setSpacing(gap: ScalarDeclaration, vertical: ScalarDeclaration, horizontal: ScalarDeclaration): this
  setSpacing(gap: ScalarDeclaration, top: ScalarDeclaration, right: ScalarDeclaration, bottom: ScalarDeclaration, left: ScalarDeclaration): this
  setSpacing(...args: any[]): this {
    const [gap, ...padding] = args
    this.setGap(gap)
    if (padding.length > 0) {
      this.setPadding.apply(this, padding as any)
    } else {
      this.setPadding(gap)
    }
    return this
  }

  computeLayout() {
    if (this.isRoot()) {
      computeRootRect(this)
    }

    const queue: Space[] = [this]
    while (queue.length > 0) {
      const current = queue.shift()!
      computeChildrenRect(current)
      queue.push(...current.children)
    }
  }
}
