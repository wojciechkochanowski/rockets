import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const computeCoords = (x:number, y:number, z:number, distance:number) => {
  const ratio = 100 / distance
  return [x*ratio, y*ratio, z*ratio]
}



export default async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  try {
    const stars = await prisma.star.findMany()
    stars.map(async (star) => {
      const [x, y, z] = computeCoords(star.x, star.y, star.z, star.distance)
      const res = await prisma.star.update({
        where: { id: star.id },
        data: { x, y, z },
      })
      console.log([x, y, z])
    })
    /*const star = stars[0]
    const [x, y, z] = computeCoords(star.x, star.y, star.z, star.distance)
    res.status(200).json(JSON.stringify([star.x, star.y, star.z]) + ' (' + star.distance + ') => ' + JSON.stringify([x, y, z]))*/
    res.status(200).json('done')
  } catch (error) {
    res.status(503)
  }
}
