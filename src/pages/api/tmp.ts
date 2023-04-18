import type { NextApiRequest, NextApiResponse } from 'next'

export default async function tmp(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    res.status(200).json('tmp: '+ process.env.DATABASE_URL)
  } catch (error: any) {
    res.status(200).json(error)
  }
}
