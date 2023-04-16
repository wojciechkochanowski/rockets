import { useLayoutEffect, useRef } from 'react'
import { Mesh, Vector3 } from "three"
import { TColor } from '@/types'

type TComponentProps = {
  position: [number, number, number]
  color: TColor,
  size: number
}

export default function StarHighlight({position: [x, y, z], color, size}: TComponentProps) {
  const ref = useRef<Mesh>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.lookAt(new Vector3(0, 0, 0))
    }
  }, [])
  if(!color) return null
  
  const highlight: TColor = [
    color[0] - 30,
    color[1] - 30,
    color[2] - 30
  ]
  return (
    <mesh
      ref={ref}
      position={[x, y, z]}>
      <circleGeometry attach="geometry" args={[size/2, 4]}/>
      <meshBasicMaterial
        color={highlight}
        toneMapped={false}
        opacity={0.4}
        transparent={true}
      />
    </mesh>
  )
}
