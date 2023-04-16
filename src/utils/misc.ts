import { TColor } from "@/types"

export const rgba = (color: TColor) => {
  if (!color){
    return 'rgba(255, 255, 255, 0.16)'
  }
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}