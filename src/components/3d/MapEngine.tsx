import { Suspense, useContext, useEffect, useRef } from "react"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useThree } from "@react-three/fiber"
import { SelectionContext } from '@/context/selection/SelectionContext'
import { TStar } from "@/types"
import StarPoint from "./StarPoint"
import Controls, { TControlsHandle } from "./Controls"
import Background from "./Background"
import MapContextProvider from "@/context/map/MapContext"

type TComponentProps = {
  stars: TStar[]
}

const MapEngine = ({ stars }: TComponentProps) => {
  const { camera, gl: { domElement } } = useThree()
  const controls = useRef<TControlsHandle>(null)
  const [{ selectedStar }, dispatch] = useContext(SelectionContext)
  useEffect(() => {
    if (controls.current && selectedStar){
      controls.current.lookAt(selectedStar.x, selectedStar.y, selectedStar.z)
    }
  }, [selectedStar])
  return (
    <MapContextProvider>
      <Background />
      <Controls camera={camera} domElement={domElement} ref={controls}/>
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
        </EffectComposer>
        {stars.map(star =>
          <StarPoint star={star} key={star.id} />
        )}
      </Suspense>
    </MapContextProvider>
  )
}

export default MapEngine