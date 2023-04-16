import { Suspense, useContext, useEffect, useRef, memo } from "react"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useThree } from "@react-three/fiber"
import { SelectionContext } from '@/context/selection/SelectionContext'
import { TColor, TConstellation, TStar } from "@/types"
import StarPoint from "./StarPoint"
import Controls, { TControlsHandle } from "./Controls"
import Background from "./Background"
import MapContextProvider from "@/context/map/MapContext"
import usePrevious from "@/hooks/usePrevious"

type TComponentProps = {
  stars: TStar[]
}

const MapEngine = ({ stars }: TComponentProps) => {
  const { camera, gl: { domElement } } = useThree()
  const controls = useRef<TControlsHandle>(null)
  const [{ selectedStar, selectedConstellations }] = useContext(SelectionContext)
  const prevConstellations = usePrevious<TConstellation[]>(selectedConstellations)

  useEffect(() => {
    if (controls.current && selectedStar){
      controls.current.lookAtStar(selectedStar)
    }
  }, [selectedStar])

  useEffect(() => {
    const prev = prevConstellations || []
    if(controls.current && (selectedConstellations.length > prev.length)){
      const newSelected = selectedConstellations.filter(c => !prev.includes(c))[0]
      const constellationStars = stars.filter(s => s.constellationId === newSelected.id)
      controls.current.lookAtConstellation(constellationStars)
    }
  }, [selectedConstellations])
  
  return (
    <MapContextProvider>
      <Background />
      <Controls camera={camera} domElement={domElement} ref={controls}/>
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={1.5} levels={9} mipmapBlur />
        </EffectComposer>
        {stars.map(star => {
          let highlight: TColor = false
          const constellation = selectedConstellations.find(c => c.id === star.constellationId)
          if(constellation){
            highlight = constellation.color
          }
          return (<StarPoint 
                    star={star} 
                    isSelected={selectedStar?.id === star.id}
                    highlight={highlight}
                    key={star.id} 
                  />)
        })}
      </Suspense>
    </MapContextProvider>
  )
}

export default MapEngine