import useStars from "@/hooks/useStars"
import { BackSide } from "three"
import { GradientTexture } from "@react-three/drei"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import StarPoint from "./3d/StarPoint"
import Controls from "./3d/Controls"

export default function Map() {
  const stars = useStars()
  return (
    <>
      {stars &&
        <Canvas camera={{ fov: 45, position: [10, 0, 0] }}>
          <Controls/>
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
          <Suspense fallback={null}>
            <EffectComposer>
              <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
            </EffectComposer>
            {stars.filter(star => ((star.magnitude || 1) < 5)).map(star => 
              <StarPoint star={star} key={star.id}/>
            )}       
          </Suspense>
        </Canvas>
      }
    </>
  )
}
