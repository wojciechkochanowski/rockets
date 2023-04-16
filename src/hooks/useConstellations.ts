import { useState, useEffect } from "react"
import { redirect } from 'next/navigation'
import { TColor, TConstellation } from "@/types";

export default function useConstellations() {
  const [constellations, setConstellations] = useState<TConstellation[] | null>(null)
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch('/api/constellations')
        const constellations: TConstellation[] = await response.json()
        setConstellations(constellations.sort((a,b) => a.name.localeCompare(b.name))
                                        .map(c => ({...c, color: false})))
      }
      fetchData()
    } catch (error) {
      console.log(error)
      redirect('/noconnection')
    }
  }, [])
  return constellations
}
