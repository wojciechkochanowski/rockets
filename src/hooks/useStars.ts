import { useState, useEffect, useContext } from "react"
import { redirect } from 'next/navigation';
import { star } from "@prisma/client";
import { SelectionContext } from "@/context/selection/SelectionContext";
import { TNamedStar } from "@/types";

export default function useStars() {
  const [stars, setStars] = useState<star[] | null>(null)
  const [, dispatch] = useContext(SelectionContext)
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch('/api/allstars')
        const stars: star[] = await response.json()
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
  }, [])
  return stars
}
