import { useContext } from 'react'
import { SelectionContext } from '@/context/selection/SelectionContext'
import { Typography } from '@mui/material'

export default function StarDetails() {
  const [ {selectedStar: star}, dispatch ] = useContext(SelectionContext)
  if (!star)
    return <Typography>No star selected</Typography>
  return (
    <dl>
      <dt>Official Name</dt>
      <dd>{star.officialName || '-'}</dd>
      <dt>Henry Draper catalog ID</dt>
      <dd>{star.hd || '-'}</dd>
      <dt>Yale Bright Star Catalog ID</dt>
      <dd>{star.hr || '-'}</dd>
      <dt>Distance in parsecs</dt>
      <dd>
        {star.distance.toFixed(2)} ({(star.distance * 3.262).toFixed(2)} light years)
      </dd>
      <dt>Apparent visual magnitude</dt>
      <dd>{star.magnitude}</dd>
      <dt>Color index</dt>
      <dd>{star.colorIndex || '-'}</dd>
    </dl>
  )
}
