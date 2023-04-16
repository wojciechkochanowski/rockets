import { useContext } from 'react'
import { Link } from '@mui/material'
import { constellation } from '@prisma/client'
import { SelectionContext } from '@/context/selection/SelectionContext'
import { rgba } from '@/utils/misc'
import { TConstellation } from '@/types'
import InfoRow from '../../widgets/InfoRow'
import StarAutocomplete from './StarAutocomplete'
import colorPicker from '../Constellations/ColorPicker'

export default function StarDetails() {
  const [{ selectedStar: star, namedStars, selectedConstellations }, dispatch] = useContext(SelectionContext)
  const selectConstellation = (constellation: constellation | null) => {
    if(constellation && !selectedConstellations.some(c => c.id === constellation.id)){
      const coloredConstellation: TConstellation = {
        ...constellation,
        color: colorPicker(selectedConstellations.length)
      }
      dispatch({
        type: 'SELECT_CONSTELLATIONS',
        constellations: [...selectedConstellations, coloredConstellation]
      })
    }
  }
  if (!star)
    return <StarAutocomplete options={namedStars} dispatch={dispatch}/>
  let constellationColor = 'transparent'
  if(selectedConstellations.length > 0){
    const constellation = selectedConstellations.find(c => c.id === star.constellationId)
    if(constellation){
      constellationColor = rgba(constellation.color)
    }
  }

  return (
    <dl>
      <InfoRow label="Official Name">
        <StarAutocomplete 
          options={namedStars} 
          dispatch={dispatch}
          placeholder={star.officialName || '-'}
        />
      </InfoRow>
      <InfoRow label="Constellation">
        {star.constellation &&
          (<Link 
            onClick={() => {selectConstellation(star.constellation)}}
            underline="none"
            sx={{
              cursor: 'pointer',
              color: '#fff',
              borderBottom: `2px solid ${constellationColor}`
            }}
          >{star.constellation.name}</Link>)
          || '-'
        }
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
