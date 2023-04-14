import { Prisma } from '@prisma/client'

export type TStar = Prisma.starGetPayload<{
  include: { constellation: true }
}>

export type TNamedStar = Omit<TStar, 'officialName'> & {officialName: string}

export type TSelectionContext = {
  drawerOpen: boolean,
  selectedStar: TStar | null,
  namedStars: TNamedStar[]
}

export type TSelectionAction = 
| { type: 'SET_NAMED_STARS'; namedStars: TStar[] }
| { type: 'SELECT_STAR'; star: TStar }
| { type: 'TOGGLE_DRAWER'; drawerOpen?: boolean }


export type TMapContext = {
  zoom: number
}

export type TMapAction = 
| { type: 'SET_ZOOM'; zoom: number }

