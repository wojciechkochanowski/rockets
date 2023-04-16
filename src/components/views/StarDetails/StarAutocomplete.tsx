import { Dispatch, SyntheticEvent } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { TNamedStar, TSelectionAction } from '@/types'

type TComponentProps = {
  options: TNamedStar[],
  dispatch: Dispatch<TSelectionAction>,
  placeholder?: string
}

const StarAutocomplete = ({options, dispatch, placeholder='Select a star'}: TComponentProps) => {
  const showDetails = (event: SyntheticEvent<Element, Event>, star: TNamedStar) => {
    dispatch({
      type: 'SELECT_STAR',
      star
    })
  }

  return <Autocomplete
    disablePortal
    disableClearable
    id="star-select"
    options={options}
    getOptionLabel={star => star.officialName}
    onChange={showDetails}
    sx={{ width: '100%' }}
    renderInput={(params) => 
      <TextField {...params}
        placeholder={placeholder}
        variant="standard"
        InputProps={{...params.InputProps, disableUnderline: true }}
        sx={{
          "& input::placeholder": { opacity: 1, fontWeight: 300 }
        }}
      />
    }
  />
}

export default StarAutocomplete