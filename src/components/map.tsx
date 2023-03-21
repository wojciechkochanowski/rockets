import useStars from "@/hooks/useStars"
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import StarPoint from "./3d/StarPoint"
import Controls from "./3d/Controls"
import Background from "./3d/Background"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

export default function Map() {
  const stars = useStars()
  if (stars) {
    return (
      <Canvas id="map-canvas-container">
        <Controls />
        <Background />
        <Suspense fallback={null}>
          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
          </EffectComposer>
          {stars.map(star =>
            <StarPoint star={star} key={star.id} />
          )}
        </Suspense>
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
