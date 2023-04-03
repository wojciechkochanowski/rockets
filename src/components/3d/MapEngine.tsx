import { Suspense, forwardRef } from "react"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useThree } from "@react-three/fiber"
import { star } from "@prisma/client"
import StarPoint from "./StarPoint"
import Controls, { TControlsHandle } from "./Controls"
import Background from "./Background"

type TComponentProps = {
  stars: star[]
}

const MapEngine = forwardRef<TControlsHandle, TComponentProps>(({ stars }, ref) => {
  const { camera, gl: { domElement } } = useThree()
  return (
    <>
      <Background />
      <Controls camera={camera} domElement={domElement} ref={ref}/>
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
        </EffectComposer>
        {stars.map(star =>
          <StarPoint star={star} key={star.id} />
        )}
      </Suspense>
    </>
  )
})

export default MapEngine