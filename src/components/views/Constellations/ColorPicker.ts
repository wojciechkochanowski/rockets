import { TColor } from "@/types"

const colors:TColor[] = [
  [43, 79, 12],
  [172, 58, 17],
  [100, 171, 195],
  [217, 90, 129],
  [244, 160, 73],
  [4, 82, 160]
]

const colorPicker = (index: number) => {
  return colors[index%colors.length]
}

export default colorPicker