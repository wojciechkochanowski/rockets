import { useState, useEffect } from "react"
import { redirect } from 'next/navigation';
import { star } from "@prisma/client";

export default function useStars() {
    const [stars, setStars] = useState<star[]|null>(null)
    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await fetch('/api/allstars')
                const stars: star[] = await response.json()
                setStars(stars)
            }
            fetchData()
        } catch(error) {
            console.log(error)
            redirect('/noconnection')
        }
    }, [])
    return stars
}
