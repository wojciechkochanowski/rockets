import { useContext, SyntheticEvent } from 'react'
import { Autocomplete, Chip, TextField } from '@mui/material'
import { SelectionContext } from '@/context/selection/SelectionContext'
import useConstellations from '@/hooks/useConstellations'
import CenteredProgress from '@/components/widgets/CenteredProgress'
import { TColor, TConstellation } from '@/types'
import colorPicker from './ColorPicker'

const rgba = (color: TColor) => {
  if (!color){
    return 'rgba(255, 255, 255, 0.16)'
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

export default function Constellations() {
  const constellations = useConstellations()
  const [{selectedConstellations}, dispatch] = useContext(SelectionContext)
  const setSelectedConstellations = (value: TConstellation[]) => {
    dispatch({
      type: 'SELECT_CONSTELLATIONS',
      constellations: value
    })
  }

  const handleChange = (event: SyntheticEvent<Element, Event>, value: TConstellation[]) => {
    setSelectedConstellations(value.map(constellation => {
      if(!constellation.color){
        constellation.color = colorPicker(value.length)
      }
      return constellation
    }))
  }

  const equalTest = (opt: TConstellation, val: TConstellation) => {
    return opt.id === val.id
  }

  const removeOption = (id:number) => {
    setSelectedConstellations(selectedConstellations.filter(c => c.id !== id))
  }

  if (!constellations)
    return <CenteredProgress/>
  return (
    <Autocomplete
      multiple
      id="constellation-ac"
      options={constellations}
      isOptionEqualToValue={equalTest}
      value={selectedConstellations}
      getOptionLabel={constellation => constellation.name}
      onChange={handleChange}
      renderInput={(params) => 
        <TextField {...params}
          placeholder="Select a constellation"
          variant="standard"
          InputProps={{...params.InputProps }}
          sx={{
            "& input::placeholder": { opacity: 1, fontWeight: 300 },
            "& input": { width: '100% !important', px: '4px !important' }
          }}
        />
      }
      renderTags={(value: readonly TConstellation[]) => {
        return value.map((option: TConstellation, index: number) => (
          <Chip 
            key={index}
            label={option.name}
            variant='outlined'
            sx={{
              borderColor: (rgba(option.color) || 'rgba(255, 255, 255, 0.16)'),
              marginRight: '2px',
              marginBottom: '2px'
            }}
            onDelete={() => {
              removeOption(option.id);
            }}
          />
        ))
      }}
    />
  )
}
