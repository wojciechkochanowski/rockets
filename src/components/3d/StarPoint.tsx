import { star } from "@prisma/client"
import { BufferAttribute } from "three"

const calculateSize = (magnitude: number):number => {
  if(magnitude<0) return 1.6
  if(magnitude<1) return 1.4
  if(magnitude<2) return 0.8
  if(magnitude<3) return 0.6
  return 0.2
}

export default function StarPoint({star}:{star:star}) {
  const point = new BufferAttribute(new Float32Array([star.x, star.y, star.z]), 3);
  
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
        color={[star.r, star.g, star.b]}
        sizeAttenuation={true}
        toneMapped={star.magnitude > 1}
      />
    </points>
  )
}
