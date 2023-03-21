import { useContext } from 'react'
import { SelectionContext } from "@/context/selection/SelectionContext"
import { star } from "@prisma/client"
import { Mesh, Vector3 } from "three"

const calculateSize = (magnitude: number): number[] => {
  if (magnitude < 0) return [0.55, 9]
  if (magnitude < 1) return [0.45, 9]
  if (magnitude < 2) return [0.4, 9]
  if (magnitude < 3) return [0.3, 6]
  if (magnitude < 4) return [0.2, 6]
  return [0.08, 4]
}

export default function StarPoint({ star }: { star: star }) {
  const [ state, dispatch ] = useContext(SelectionContext)
  const [radius, segments] = calculateSize(star.magnitude)

  const showDetails = () => {
    dispatch({
      type: 'SELECT_STAR',
      star
    })
  }

  const rotate = (self:Mesh) => {
    self.lookAt(new Vector3(0, 0, 0))
  }

  return (
    <mesh 
      position={[star.x, star.y, star.z]}
      onUpdate={rotate}
      onClick={showDetails}>
      <circleGeometry attach="geometry" args={[radius, segments]} />
      <meshBasicMaterial
        color={[star.r, star.g, star.b]}
        toneMapped={star.magnitude > 2}
      />
    </mesh>
  )
}
