import { star } from "@prisma/client";

export type TSelectionContext = {
  drawerOpen: boolean,
  selectedStar: star | null
}

export type TSelectionAction = 
| { type: 'SELECT_STAR'; star: star }
| { type: 'TOGGLE_DRAWER'; drawerOpen?: boolean }