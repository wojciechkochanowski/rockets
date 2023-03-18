import { useRef } from "react"
import { useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

function Controls() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const { camera, gl: { domElement } } = useThree();

  function handleWheel(this: HTMLCanvasElement, ev: WheelEvent): any {
    ev.stopPropagation()
    let newZoom = camera.zoom + -1*(ev.deltaY/1000)
    if(newZoom < 1) newZoom = 1
    if(newZoom > 10) newZoom = 10
    if(controlsRef.current)
      controlsRef.current.panSpeed = 2 * newZoom
    camera.zoom = newZoom
    camera.updateProjectionMatrix()
  }
  domElement.addEventListener("wheel", handleWheel);

  return <>
    <OrbitControls
      args={[camera, domElement]}
      target={[0, 0, 0]}
      enableZoom={false}
      reverseOrbit={true}
      panSpeed={0.1}
      ref={controlsRef}
    />
    <PerspectiveCamera makeDefault fov={90} position={[5, 0, 0]} zoom={1.8}/>
  </>
}

export default Controls