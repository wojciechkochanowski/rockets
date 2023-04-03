import { useLayoutEffect, useRef, useContext } from 'react'
import { ReactThreeFiber, extend } from '@react-three/fiber'
import { Path, Line, BufferGeometry, Vector3 } from "three"
import { MapContext } from '@/context/map/MapContext'

/* typescript dom hack */
extend({ Line_: Line })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof Line>
    }
  }
}
/* typescript dom hack end */

type TComponentProps = {
  position: [number, number, number]
}

export default function Ring({position: [x, y, z]}: TComponentProps) {
  const [ {zoom} ] = useContext(MapContext)
  const radius = 5 / zoom**0.85
  const points = new Path().absarc(0, 0, radius, 0, Math.PI * 2, true).getPoints(20)  
  const geometry = useRef<BufferGeometry>(null)
  const line = useRef<Line>(null)
  useLayoutEffect(() => {
    if (geometry.current && line.current) {
      geometry.current.setFromPoints(points)
      line.current.lookAt(new Vector3(0, 0, 0))
      line.current.computeLineDistances()
    }
  }, [zoom]);

  return (
    <line_ ref={line} position={[x, y, z]}>
      <lineDashedMaterial color={0xFFFFFF} dashSize={Math.PI*radius/5} gapSize={Math.PI*radius/5} linewidth={1}/>
      <bufferGeometry ref={geometry} attach="geometry"/>
    </line_>
  )
}
