import useStars from "@/hooks/useStars"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import StarPoint from "./3d/StarPoint"

export default function Map() {
  const stars = useStars()
  return (
    <>
      {stars &&
        <Canvas>
          <Suspense fallback={null}>
            {stars.filter(star => ((star.magnitude || 1) > 6)).map(star => 
              <StarPoint star={star}/>
            )}            
            <OrbitControls />
          </Suspense>
        </Canvas>
      }
    </>
  )
}
