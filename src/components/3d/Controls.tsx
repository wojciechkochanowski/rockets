import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

function Controls() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const { camera, gl: { domElement } } = useThree();

  useFrame(({ gl, scene, camera }) => {
    if (!controlsRef.current) {
      return
    }
    const { x, y, z } = controlsRef.current.object.position
    camera.lookAt(x * 2, y * 2, z * 2)
    gl.render(scene, camera)
  }, 1);

  function handleWheel(this: HTMLCanvasElement, ev: WheelEvent):any {
    if(ev.shiftKey) return
    ev.stopPropagation()
    const reversedEvent = new WheelEvent('wheel', {
      deltaY: -1 * ev.deltaY,
      deltaMode: ev.deltaMode,
      shiftKey: true
    })
    domElement.dispatchEvent(reversedEvent)
    console.log(ev.deltaY)
  }
  //domElement.addEventListener("wheel", handleWheel);

  return <OrbitControls
    args={[camera, domElement]}
    target={[0, 0, 0]}
    enableZoom={true}
    reverseOrbit={false}
    ref={controlsRef}
    minDistance={10}
    maxDistance={80}
    screenSpacePanning={false}
    onWheel={(event) => {
      console.log(event)
    }}
  />
}

export default Controls