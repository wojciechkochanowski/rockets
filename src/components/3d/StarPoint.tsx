import { star } from "@prisma/client"
import { useMemo } from "react"
import { BufferAttribute, Color } from "three"

export default function StarPoint({star}:{star:star}) {
  const point = new BufferAttribute(new Float32Array([star.x, star.y, star.z]), 3);
  const mag = Math.pow((star.magnitude || 1)/6, 2)

  return (
    <points /*onClick={() => alert(star.officialName || star.hr)}*/>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...point} />
      </bufferGeometry>
      <pointsMaterial
        size={mag}
        color={new Color("#" + star.color)}
        sizeAttenuation={false}
      />
    </points>
  )
}
