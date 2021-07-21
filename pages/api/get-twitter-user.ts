import { NextApiRequest, NextApiResponse } from 'next'
import { TwitterUser } from '../../models/TwitterUser'

export default async function getTwitterUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<TwitterUser | void> {
  const token = process.env.API_TOKEN
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: `ERROR: Please use GET method`,
    })
  }
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
  const api = 'https://api.twitter.com/1.1/users/show.json'
  const id = req.query.id
  try {
    return await fetch(`${api}?user_id=${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    })
      .then(async (apiResponse) => {
        const userJson = (await apiResponse.json()) as TwitterUser
        if (apiResponse.ok) {
          return res.status(200).json(userJson)
        } else {
          return res.status(500).json(
            userJson ?? {
              message: `ERROR: No response`,
            }
          )
        }
      })
      .catch((e) => {
        return res.status(500).json({
          message: `ERROR: ${e}`,
        })
      })
  } catch (e) {
    return res.status(500).json({
      message: `ERROR: ${e}`,
    })
  }
}
