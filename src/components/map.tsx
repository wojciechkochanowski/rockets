import useStars from "@/hooks/useStars"
import { BackSide } from "three"
import { OrbitControls, GradientTexture } from "@react-three/drei"
//import { UnrealBloomPass } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas, extend } from "@react-three/fiber"
import { Suspense } from "react"
import StarPoint from "./3d/StarPoint"

//extend({ UnrealBloomPass })

export default function Map() {
  const stars = useStars()
  return (
    <>
      {stars &&
        <Canvas camera={{ fov: 45, position: [1, 0, 0] }}>
          <Suspense fallback={null}>
            <mesh>
              <sphereGeometry args={[110, 32, 32]} attach="geometry" />
                <meshBasicMaterial side={BackSide}>
                  <GradientTexture
                    stops={[0, 0.45, 0.5, 0.55, 1]}
                    colors={['#16092B', '#060519', 'black', '#190C05', '#29050E']}
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
              <StarPoint star={star}/>
            )}            
            <OrbitControls target={[0, 0, 0]} enableZoom={false}/>
          </Suspense>
        </Canvas>
      }
    </>
  )
}
