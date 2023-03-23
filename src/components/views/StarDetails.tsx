import { useContext } from 'react'
import { SelectionContext } from '@/context/selection/SelectionContext'
import { Typography } from '@mui/material'
import InfoRow from '../widgets/InfoRow'

export default function StarDetails() {
  const [{ selectedStar: star }, dispatch] = useContext(SelectionContext)
  if (!star)
    return <Typography variant='overline'>No star selected</Typography>
  return (
    <dl>
      <InfoRow label="Official Name">
        {star.officialName || '-'}
      </InfoRow>
      <InfoRow label="Henry Draper catalog ID">
        {star.hd || '-'}
      </InfoRow>
      <InfoRow label="Yale Bright Star Catalog ID">
        {star.hr || '-'}
      </InfoRow>
      <InfoRow label="Distance in parsecs">
        {star.distance.toFixed(2)} ({(star.distance * 3.262).toFixed(2)} light years)
      </InfoRow>
      <InfoRow label="Apparent visual magnitude">
        {star.magnitude}
      </InfoRow>
      <InfoRow label="Color index">
        {star.colorIndex || '-'}
      </InfoRow>
    </dl>
  )
}
