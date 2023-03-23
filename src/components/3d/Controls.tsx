import { useEffect, useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Camera } from "@react-three/fiber"

type componentProps = {
  camera: Camera,
  domElement: HTMLCanvasElement
}

function Controls({camera, domElement}: componentProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  function handleWheel(this: HTMLCanvasElement, ev: WheelEvent): any {
    ev.stopPropagation()
    ev.preventDefault()
    let newZoom = camera.zoom + -1*(ev.deltaY/1000)
    if(newZoom < 1) newZoom = 1
    if(newZoom > 10) newZoom = 10
    if(controlsRef.current)
      controlsRef.current.rotateSpeed = 2 / newZoom
    camera.zoom = newZoom
    camera.updateProjectionMatrix()
  }

  useEffect(() => {
    if(camera.parent){ // scene must be initialized, prevents from firing twice
      domElement.addEventListener("wheel", handleWheel);
    }
  }, [camera])

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
}

export default Controls