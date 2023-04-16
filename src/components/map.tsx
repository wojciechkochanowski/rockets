import useStars from "@/hooks/useStars"
import { Canvas } from "@react-three/fiber"
import MapEngine from "./3d/MapEngine"
import CenteredProgress from "./widgets/CenteredProgress"

export default function Map() {
  const stars = useStars()  
  if (stars) {
    return (
      <Canvas id="map-canvas-container">
        <MapEngine stars={stars}/>
      </Canvas>
    )
  } else {
    return <CenteredProgress/>
  }
}