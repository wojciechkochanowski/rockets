import { Grid, CircularProgress } from "@mui/material"

export default function CenteredProgress() {
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
