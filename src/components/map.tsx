import useStars from "@/hooks/useStars"
import { Canvas } from "@react-three/fiber"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import MapEngine from "./3d/MapEngine"

export default function Map() {
  const stars = useStars()  
  if (stars) {
    return (
      <Canvas id="map-canvas-container">
        <MapEngine stars={stars}/>
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