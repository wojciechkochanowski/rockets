import { useContext } from 'react'
import { SelectionContext } from '@/context/selection/SelectionContext'
import InfoRow from '../../widgets/InfoRow'
import StarAutocomplete from './StarAutocomplete'

export default function StarDetails() {
  const [{ selectedStar: star, namedStars }, dispatch] = useContext(SelectionContext)
  if (!star)
    return <StarAutocomplete options={namedStars} dispatch={dispatch}/>
  return (
    <dl>
      <InfoRow label="Official Name">
        <StarAutocomplete 
          options={namedStars} 
          dispatch={dispatch}
          placeholder={star.officialName || '-'}
        />
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
      <InfoRow label="Constellation">
        {star.constellation?.name || '-'}
      </InfoRow>
    </dl>
  )
}
