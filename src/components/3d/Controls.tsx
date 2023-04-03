import { useState, useEffect, useRef, forwardRef, useCallback, useImperativeHandle } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Camera, useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { equals } from "@/utils/vector"

type TComponentProps = {
  camera: Camera,
  domElement: HTMLCanvasElement
}

export type TControlsHandle = {
  lookAt: (x:number, y:number, z: number) => void
}

const Controls = forwardRef<TControlsHandle, TComponentProps>(({camera, domElement}, ref) => {
  const controlsRef = useRef<OrbitControlsImpl>(null)  
  const [camDestPos, setCamDestPos] = useState<Vector3 | null>(null)

  useImperativeHandle(ref, () => ({
    lookAt: (x, y, z) => {
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
    />
    <PerspectiveCamera makeDefault fov={90} position={[5, 0, 0]} zoom={2}/>
  </>
})

export default Controls