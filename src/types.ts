import { star } from "@prisma/client"

export type TNamedStar = Omit<star, 'officialName'> & {officialName: string}

export type TSelectionContext = {
  drawerOpen: boolean,
  selectedStar: star | null,
  namedStars: TNamedStar[]
}

export type TSelectionAction = 
| { type: 'SET_NAMED_STARS'; namedStars: star[] }
| { type: 'SELECT_STAR'; star: star }
| { type: 'TOGGLE_DRAWER'; drawerOpen?: boolean }


export type TMapContext = {
  zoom: number
}

export type TMapAction = 
| { type: 'SET_ZOOM'; zoom: number }

