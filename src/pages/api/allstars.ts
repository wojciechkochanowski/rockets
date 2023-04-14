import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { star } from '@prisma/client'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<star[]>
) => {
  try {
    const stars = await prisma.star.findMany({
      where: {
        magnitude: {
          lt: 5
        }
      },
      select: {
        id: true,
        x: true,
        y: true,
        z: true,
        distance: true,
        officialName: true,
        hd: true,
        hr: true,
        colorIndex: true,
        magnitude: true,
        r: true,
        g: true,
        b: true,
        constellation: true,
        constellationId: true
      },
    })
    res.status(200).json(stars)
  } catch (error) {
    res.status(503)
  }
}
