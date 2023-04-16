import { useContext, useRef, useLayoutEffect } from 'react'
import { SelectionContext } from "@/context/selection/SelectionContext"
import { Mesh, Vector3 } from "three"
import { TColor, TStar } from "@/types"
import Ring from './Ring'
import StarHighlight from './StarHighlight'

const calculateSize = (magnitude: number): number[] => {
  if (magnitude < 0) return [0.55, 9]
  if (magnitude < 1) return [0.45, 9]
  if (magnitude < 2) return [0.4, 9]
  if (magnitude < 3) return [0.3, 6]
  if (magnitude < 4) return [0.2, 6]
  return [0.08, 4]
}

type TComponentProps = {
  star: TStar,
  isSelected: Boolean,
  highlight: TColor
}

const StarPoint = ({ star, isSelected, highlight }: TComponentProps) => {
  const [ context, dispatch ] = useContext(SelectionContext)
  const ref = useRef<Mesh>(null)
  const [radius, segments] = calculateSize(star.magnitude)

  const showDetails = () => {
    dispatch({
      type: 'SELECT_STAR',
      star
    })
  }

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.lookAt(new Vector3(0, 0, 0))
    }
  }, [])

  return (
    <>
      { highlight && 
        <StarHighlight position={[star.x, star.y, star.z]} color={highlight} size={radius}/>
      }
      <mesh 
        ref={ref}
        position={[star.x, star.y, star.z]}
        onClick={showDetails}>
        <circleGeometry attach="geometry" args={[radius, segments]} />
        <meshBasicMaterial
          color={[star.r, star.g, star.b]}
          toneMapped={star.magnitude > 2}
        />
      </mesh>
      { isSelected &&
        <Ring position={[star.x, star.y, star.z]}/>
      }
    </>
  )
}

export default StarPoint
