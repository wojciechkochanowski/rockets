import { useState, useEffect, useContext } from "react"
import { redirect } from 'next/navigation'
import { TStar } from "@/types"
import { SelectionContext } from "@/context/selection/SelectionContext"
import { TNamedStar } from "@/types";

export default function useStars() {
  const [stars, setStars] = useState<TStar[] | null>(null)
  const [, dispatch] = useContext(SelectionContext)
  useEffect(() => {
    try {
      console.log('fetch stars')
      const fetchData = async () => {
        const response = await fetch('/api/allstars')
        const stars: TStar[] = await response.json()
        const namedStars = stars.filter((star): star is TNamedStar => (star.officialName !== null))
                                .sort((a,b) => a.officialName.localeCompare(b.officialName))
        dispatch({
          type: "SET_NAMED_STARS",
          namedStars: namedStars
        })
        setStars(stars)
      }
      fetchData()
    } catch (error) {
      console.log(error)
      redirect('/noconnection')
    }
  }, [dispatch])
  return stars
}
