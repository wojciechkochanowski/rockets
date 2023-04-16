import { Vector3 } from "three"

export const equals = ( v1:Vector3, v2:Vector3, epsilon = 0.0001 ) => {
  return ( 
    ( Math.abs( v1.x - v2.x ) < epsilon ) && 
    ( Math.abs( v1.y - v2.y ) < epsilon ) && 
    ( Math.abs( v1.z - v2.z ) < epsilon ) 
  )
}