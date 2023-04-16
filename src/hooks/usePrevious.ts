import { useRef, useEffect } from "react"

export default function usePrevious<TVal>(value: TVal) {
  const ref = useRef<TVal>()
  useEffect(() => {
    ref.current = value
  },[value])
  return ref.current
}
