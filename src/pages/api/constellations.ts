import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { constellation } from '@prisma/client'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<constellation[]>
) => {
  try {
    const constellations = await prisma.constellation.findMany()
    res.status(200).json(constellations)
  } catch (error) {
    res.status(503)
  }
}
