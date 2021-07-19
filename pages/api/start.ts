import { NextApiRequest, NextApiResponse } from 'next'

export async function start(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    message: 'test',
  })
}
