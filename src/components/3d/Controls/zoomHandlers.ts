import { Dispatch, RefObject } from "react"
import { Camera } from "@react-three/fiber"
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { TMapAction } from "@/types"

const evCache: PointerEvent[] = []
let prevDiff = -1

export function makeWheelHandler (camera: Camera, 
                                  controlsRef: RefObject<OrbitControlsImpl>, 
                                  dispatch: Dispatch<TMapAction>){
  return function handleWheel(this: HTMLCanvasElement, ev: WheelEvent): any {
    ev.stopPropagation()
    ev.preventDefault()
    let newZoom = camera.zoom + -1*(ev.deltaY/1000)
    if(newZoom < 1) newZoom = 1
    if(newZoom > 10) newZoom = 10
    if(controlsRef.current)
      controlsRef.current.rotateSpeed = 2 / newZoom / 3
    camera.zoom = newZoom
    dispatch({type: 'SET_ZOOM', zoom: newZoom})
    camera.updateProjectionMatrix()
  }
}

//source: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
export function addPinchHandlers(el: HTMLCanvasElement,
                                 camera: Camera, 
                                 controlsRef: RefObject<OrbitControlsImpl>, 
                                 dispatch: Dispatch<TMapAction>
  ){
  el.onpointerdown = (ev: PointerEvent) => {
    pointerdownHandler(ev)
  }
  el.onpointermove = (ev: PointerEvent) => {
    pointermoveHandler(ev, camera, controlsRef, dispatch)
  }
  el.onpointerup = 
  el.onpointercancel = 
  el.onpointerout = 
  el.onpointerleave = (ev: PointerEvent) => {
    pointerupHandler(ev)
  }
}

function pointerdownHandler(ev: PointerEvent) {
  evCache.push(ev)
}

function pointermoveHandler(ev: PointerEvent,
                            camera: Camera, 
                            controlsRef: RefObject<OrbitControlsImpl>, 
                            dispatch: Dispatch<TMapAction>) {
  // This function implements a 2-pointer horizontal pinch/zoom gesture.
  //
  // If the distance between the two pointers has increased (zoom in),
  // the target element's background is changed to "pink" and if the
  // distance is decreasing (zoom out), the color is changed to "lightblue".

  // Find this event in the cache and update its record with this event
  const index = evCache.findIndex(
    (cachedEv) => cachedEv.pointerId === ev.pointerId
  )
  evCache[index] = ev

  // If two pointers are down, check for pinch gestures
  if (evCache.length === 2) {
    // Calculate the distance between the two pointers
    const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX)

    if (prevDiff > 0) {
      let newZoom = camera.zoom + (curDiff - prevDiff)/50
      if(newZoom < 1) newZoom = 1
      if(newZoom > 10) newZoom = 10
      if(controlsRef.current)
        controlsRef.current.rotateSpeed = 2 / newZoom / 3
      camera.zoom = newZoom
      dispatch({type: 'SET_ZOOM', zoom: newZoom})
      camera.updateProjectionMatrix()
    }

    // Cache the distance for the next move event
    prevDiff = curDiff
  }
}

function pointerupHandler(ev: PointerEvent) {
  // Remove this pointer from the cache and reset the target's
  // background and border
  removeEvent(ev)
  //ev.target.style.background = "white"
  //ev.target.style.border = "1px solid black"

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1
  }
}

function removeEvent(ev: PointerEvent) {
  // Remove this event from the target's cache
  const index = evCache.findIndex(
    (cachedEv) => cachedEv.pointerId === ev.pointerId
  )
  evCache.splice(index, 1)
}