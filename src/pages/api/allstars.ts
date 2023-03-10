// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { star } from '@prisma/client'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<star[]>
) => {
  try {
    const stars = await prisma.star.findMany()
    res.status(200).json(stars)
  } catch (error) {
    res.status(503)
  }
}
