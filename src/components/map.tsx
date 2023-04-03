import { useContext, useEffect, useRef } from "react"
import useStars from "@/hooks/useStars"
import { Canvas } from "@react-three/fiber"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import { SelectionContext } from '@/context/selection/SelectionContext'
import MapEngine from "./3d/MapEngine"
import { TControlsHandle } from "./3d/Controls"

export default function Map() {
  const stars = useStars()  
  const engine = useRef<TControlsHandle>(null)
  const [{ selectedStar }, dispatch] = useContext(SelectionContext)
  useEffect(() => {
    if (engine.current && selectedStar){
      engine.current.lookAt(selectedStar.x, selectedStar.y, selectedStar.z)
    }
  }, [selectedStar])
  if (stars) {
    return (
      <Canvas id="map-canvas-container">
        <MapEngine stars={stars} ref={engine}/>
      </Canvas>
    )
  } else {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          height: '100%'
        }}
      >
        <CircularProgress />
      </Grid>
    )
  }
}