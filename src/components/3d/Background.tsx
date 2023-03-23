import { BackSide } from "three"
import { GradientTexture } from "@react-three/drei"
import { Suspense } from "react"

export default function Background() {
  return (
    <Suspense fallback={null}>
      <mesh>
        <sphereGeometry args={[110, 32, 32]} attach="geometry" />
        <meshBasicMaterial side={BackSide}>
          <GradientTexture
            stops={[0, 0.45, 0.5, 0.55, 1]}
            colors={['#16092B', '#050414', 'black', '#140A04', '#29050E']}
            size={1024}
          />
        </meshBasicMaterial>
      </mesh>
    </Suspense>
  )
}
