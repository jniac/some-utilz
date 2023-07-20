import { IUniform, Material, Shader } from 'three'
import { MeshPhysicalMaterialFragmentTokens, MeshPhysicalMaterialVertexTokens, glTokens } from './Tokens'

type Uniforms = Record<string, IUniform>

let current: Shader = null!

const wrap = <T extends Material>(material: T, callback: (shader: Shader) => void): T => {
  material.onBeforeCompile = shader => {
    current = shader
  }
  return material
}
const withShader = (shader: Shader) => {
  current = shader
  return ShaderForge
}

const START = '// ShaderForge (injected code) ->'
const END = '// <- ShaderForge'
/**
 * Wraps code with [START] & [END] patterns.
 */
const wrapCode = (code: string) => `${START}\n${code.trim()}\n${END}`
/**
 * Removes [END][whitespaces][START] patterns from the code.
 */
const cleanWrappedCode = (code: string) => {
  const f = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = String.raw`${f(END)}\s*${f(START)}`
  const re = new RegExp(pattern, 'g')
  return code.replaceAll(re, '')
}

const getGlType = (value: any) => {
  if (typeof value === 'number') {
    return 'float'
  }
  if (value.isVector2) {
    return 'vec2'
  }
  if (value.isVector3 || value.isColor) {
    return 'vec3'
  }
  if (value.isVector4 || value.isQuaternion) {
    return 'vec4'
  }
  if (value.isMatrix3) {
    return 'mat3'
  }
  if (value.isMatrix4) {
    return 'mat4'
  }
  if (value.isTexture) {
    if (value.isCubeTexture) {
      return 'samplerCube'
    } else {
      return 'sampler2D'
    }
  }
  console.log(`unhandled value:`, value)
  throw new Error(`unhandled value: "${value?.constructor.name}"`)
}

class ShaderTool<T> {
  #type: 'vertexShader' | 'fragmentShader'
  constructor(type: 'vertexShader' | 'fragmentShader') {
    this.#type = type
  }

  #getPattern(token: T, { throwError = true } = {}) {
    const pattern = `#include <${token}>`
    const type = this.#type
    if (throwError && current[type].includes(pattern) === false) {
      throw new Error(`"${pattern}" is not present in the shader template program.`)
    }
    return { pattern, type }
  }

  replace(token: T, code: string) {
    const { type, pattern } = this.#getPattern(token)
    const str = wrapCode(code)
    current[type] = current[type].replace(pattern, str)
    return ShaderForge
  }

  inject(position: 'before' | 'after', token: T, code: string) {
    const { type, pattern } = this.#getPattern(token)
    const str = position === 'after' 
    ? `${pattern}\n${wrapCode(code)}`
    : `${wrapCode(code)}\n${pattern}`
    current[type] = current[type].replace(pattern, str)
    return ShaderForge
  }
  
  injectTokenComments() {
    for (const token of glTokens) {
      const { type, pattern } = this.#getPattern(token as T, { throwError: false })
      current[type] = current[type].replace(pattern, `
        ${pattern}
        // ShaderForge TOKEN: ${token}
      `)
    }
    return ShaderForge
  }

  header(str: string) {
    const type = this.#type
    current[type] = `${str}\n${current[type]}`
    return ShaderForge
  }

  /** Shorthand for `.inject('before', token, code)` */
  before(token: T, code: string) {
    return this.inject('before', token, code)
  }

  /** Shorthand for `.inject('after', token, code)` */
  after(token: T, code: string) {
    return this.inject('after', token, code)
  }

  top(...codes: string[]) {
    current[this.#type] = current[this.#type].replace('void main() {', /* glsl */`
      ${wrapCode(codes.join('\n\n'))}
      void main() {
    `)
    return ShaderForge
  }

  mainBeforeAll(code: string) {
    current[this.#type] = current[this.#type]
      .replace('void main() {', `void main() {
        ${wrapCode(code)}`)
    return ShaderForge
  }

  mainAfterAll(code: string) {
    current[this.#type] = current[this.#type]
      .replace(/}\s*$/, `
      ${wrapCode(code)}
    }`)
    return ShaderForge
  }

  uniforms(uniforms: Uniforms) {
    const declaration: string[] = []
    for (const [key, uniform] of Object.entries(uniforms)) {
      declaration.push(`uniform ${getGlType(uniform.value)} ${key};`)
    }
    this.top(declaration.join('\n'))
    return mergeUniforms(uniforms)
  }

  clean() {
    current[this.#type] = cleanWrappedCode(current[this.#type])
    return ShaderForge
  }
}

const defines = (defines: Record<string, string | number>) => {
  if ((current as any).defines) {
    Object.assign((current as any).defines, defines)
  } else {
    (current as any).defines = defines
  }
  return ShaderForge
}

const mergeUniforms = (uniforms: Uniforms) => {
  for (const [key, uniform] of Object.entries(uniforms)) {
    if (key in current.uniforms) {
      if (uniform.value !== current.uniforms[key].value) {
        throw new Error(`Shader redefinition! (Uniform values are not equal)`)
      }
    } else {
      current.uniforms[key] = uniform
    }
  }
  return ShaderForge
}

const uniforms = (uniforms: Uniforms) => {
  vertex.uniforms(uniforms)
  fragment.uniforms(uniforms)
  return ShaderForge
}

const varyingTypes = ['float', 'vec2', 'vec3', 'vec4'] as const
type VaryingType = (typeof varyingTypes)[number]
const varying = (varying: Record<string, VaryingType>) => {
  const declaration: string[] = []
  for (const [name, type] of Object.entries(varying)) {
    declaration.push(`varying ${type} ${name};`)
  }
  vertex.top(declaration.join('\n'))
  fragment.top(declaration.join('\n'))
  return ShaderForge
}

/**
 * `header()` will prepend the shader program with an header (debug purpose 
 * essentially).
 */
const header = (str: string) => {
  fragment.header(str)
  vertex.header(str)
  return ShaderForge
}

/**
 * `clean()` will remove from the source code of each program any useless injected 
 * comments (because injected chunks may be chained one after the other, so the 
 * following patterns will be removed: [END][whitespaces][START])
 */
const clean = () => {
  fragment.clean()
  vertex.clean()
  return ShaderForge
}

const fragment = new ShaderTool<MeshPhysicalMaterialFragmentTokens>('fragmentShader')
const vertex = new ShaderTool<MeshPhysicalMaterialVertexTokens>('vertexShader')

type ShaderForgeType = {
  defines: typeof defines
  uniforms: typeof uniforms,
  varying: typeof varying,
  vertex: typeof vertex,
  fragment: typeof fragment,
  header: typeof header,
  clean: typeof clean,
  with: typeof withShader,
  wrap: typeof wrap,
}

/**
 * A toolkit to help modifying threejs existing shaders.
 * 
 * [Shader templates](https://github.com/mrdoob/three.js/tree/master/src/renderers/shaders/ShaderLib): 
 * - [MeshPhysicalMaterial](https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshphysical.glsl.js)
 * - [MeshBasicMaterial](https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib/meshbasic.glsl.js)
 */
export const ShaderForge: ShaderForgeType = {
  defines,
  uniforms,
  varying,
  vertex,
  fragment,
  header,
  clean,
  with: withShader,
  wrap,
}