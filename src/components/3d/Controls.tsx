import { useState, useEffect, useRef, forwardRef, useCallback, useImperativeHandle, useContext } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Camera, useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { equals } from "@/utils/vector"
import { MapContext } from "@/context/map/MapContext"
import { TStar } from "@/types"

type TComponentProps = {
  camera: Camera,
  domElement: HTMLCanvasElement
}

export type TControlsHandle = {
  lookAtStar: (star: TStar) => void,
  lookAtConstellation: (stars: TStar[]) => void
}

const Controls = forwardRef<TControlsHandle, TComponentProps>(({camera, domElement}, ref) => {
  const controlsRef = useRef<OrbitControlsImpl>(null)  
  const [ {zoom}, dispatch ] = useContext(MapContext)
  const [camDestPos, setCamDestPos] = useState<Vector3 | null>(null)

  useImperativeHandle(ref, () => ({
    lookAtStar: (star) => {
      const {x, y, z} = star
      setCamDestPos(new Vector3(-1*x/20, -1*y/20, -1*z/20))
    },
    lookAtConstellation: (stars) => {
      const {x, y, z} = {
        x: stars.reduce((total, star) => total + star.x, 0) / stars.length,
        y: stars.reduce((total, star) => total + star.y, 0) / stars.length,
        z: stars.reduce((total, star) => total + star.z, 0) / stars.length
      }
      setCamDestPos(new Vector3(-1*x/20, -1*y/20, -1*z/20))
    }
  }))

  const handleWheel = useCallback(function handleWheel(this: HTMLCanvasElement, ev: WheelEvent): any {
    ev.stopPropagation()
    ev.preventDefault()
    let newZoom = camera.zoom + -1*(ev.deltaY/1000)
    if(newZoom < 1) newZoom = 1
    if(newZoom > 10) newZoom = 10
    if(controlsRef.current)
      controlsRef.current.rotateSpeed = 2 / newZoom
    camera.zoom = newZoom
    dispatch({type: 'SET_ZOOM', zoom: newZoom})
    camera.updateProjectionMatrix()
  }, [camera])

  useEffect(() => {
    if(camera.parent){ // scene must be initialized, prevents from firing twice
      domElement.addEventListener("wheel", handleWheel);
    }
  }, [camera])

  useFrame(function renderCallback() {
    if(camera?.parent && camDestPos){
      if(equals(camera.position, camDestPos)){
        setCamDestPos(null)
      }
      camera.position.lerp(camDestPos, 0.05)
      camera.lookAt(0, 0, 0)
      camera.updateMatrixWorld()
    }
  })

  return <>
    <OrbitControls
      args={[camera, domElement]}
      target={[0, 0, 0]}
      enableZoom={false}
      reverseOrbit={true}
      ref={controlsRef}
      onStart={() => { setCamDestPos(null) }}
    />
    <PerspectiveCamera makeDefault fov={90} position={[5, 0, 0]} zoom={zoom}/>
  </>
})

export default Controls