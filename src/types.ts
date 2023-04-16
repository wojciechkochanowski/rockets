import { Prisma, constellation } from '@prisma/client'

export type TStar = Prisma.starGetPayload<{
  include: { constellation: true }
}>

export type TNamedStar = Omit<TStar, 'officialName'> & { officialName: string }

export type TColor = [number, number, number] | false

export type TConstellation = constellation & { color: TColor }

export type TSelectionContext = {
  drawerOpen: boolean,
  selectedStar: TStar | null,
  selectedConstellations: TConstellation[],
  namedStars: TNamedStar[]
}

export type TSelectionAction = 
| { type: 'SET_NAMED_STARS'; namedStars: TNamedStar[] }
| { type: 'SELECT_STAR'; star: TStar }
| { type: 'SELECT_CONSTELLATIONS'; constellations: TConstellation[] }
| { type: 'TOGGLE_DRAWER'; drawerOpen?: boolean }


export type TMapContext = {
  zoom: number
}

export type TMapAction = 
| { type: 'SET_ZOOM'; zoom: number }

