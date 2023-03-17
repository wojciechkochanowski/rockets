import { star } from "@prisma/client"
import { useMemo } from "react"
import { BufferAttribute, Color } from "three"

const calculateSize = (magnitude: number):number => {
  if(magnitude<0) return 8
  if(magnitude<1) return 7
  if(magnitude<2) return 4
  if(magnitude<3) return 2
  return 1
}

export default function StarPoint({star}:{star:star}) {
  const point = new BufferAttribute(new Float32Array([star.x, star.y, star.z]), 3);
  //const mag = Math.pow((13 - star.magnitude) / 7, 2)
  
  const mag = calculateSize(star.magnitude)

  const showDetails = () => {
    alert((star.officialName || star.hr)+"\n"+star.magnitude)
  }

  return (
    <points onClick={showDetails}>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...point} />
      </bufferGeometry>
      <pointsMaterial
        size={mag}
        color={/*new Color("#" + star.color)*/[star.r, star.g, star.b]}
        sizeAttenuation={false}
        toneMapped={star.magnitude > 1}
      />
    </points>
  )
}
