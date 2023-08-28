'use client'

import { useMemo } from 'react'
import { Camera, LinearToneMapping } from 'three'
import { Canvas, CanvasProps, useThree } from '@react-three/fiber'

import { ViewportProvider } from './viewport'
import { PointerProvider } from './pointer'
import { DebugDrawProvider } from './debug-draw'
import { VertigoStateDeclaration } from '../../three/vertigo/state'
import { VertigoCamera } from '../../three/vertigo/VertigoCamera'
import { smartDigest } from '../../react/hooks'

function solveCamera(camera: Camera | VertigoStateDeclaration | undefined): Camera | undefined {
  if (camera instanceof Camera) {
    return camera
  }
  if (camera && typeof camera === 'object') {
    return new VertigoCamera().setVertigo(camera)
  }
  return undefined
}

function Expose() {
  const three = useThree()
  Object.assign(window, { three })
  return null
}

export function ContextCanvas({
  renderTickOrder = 1000, 
  gl, 
  children,
  camera,
  expose,
  ...props
}: Omit<CanvasProps, 'camera'> & Partial<{
  renderTickOrder: number
  camera: Camera | VertigoStateDeclaration
  expose: boolean
}>) {
  const solvedCamera = useMemo(() => {
    return solveCamera(camera)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smartDigest([camera])])
  return (
    <Canvas
      flat
      gl={{ outputColorSpace: 'srgb', toneMapping: LinearToneMapping, ...gl }}
      {...props}
      frameloop='never'
      camera={solvedCamera as any}
    >
      <ViewportProvider tickOrder={renderTickOrder}>
        <PointerProvider>
          <DebugDrawProvider>
            {expose && (
              <Expose />
            )}
            {children}
          </DebugDrawProvider>
        </PointerProvider>
      </ViewportProvider>
    </Canvas>
  )
}
