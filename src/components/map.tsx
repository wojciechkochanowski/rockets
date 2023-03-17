import useStars from "@/hooks/useStars"
import { OrbitControls } from "@react-three/drei"
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
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
        </EffectComposer>
          <Suspense fallback={null}>
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
