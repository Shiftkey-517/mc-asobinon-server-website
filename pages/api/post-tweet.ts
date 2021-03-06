import { NextApiRequest, NextApiResponse } from 'next'

export default async function postTweet(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = process.env.API_TOKEN
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: `ERROR: Please use POST method`,
    })
  }
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const body = req.body as string | undefined
  if (!body) {
    return res.status(500).json({
      message: `ERROR: Please add body`,
    })
  }
  const api = process.env.NEXT_PUBLIC_TWITTER_API ?? ''

  try {
    console.debug({ sending: body })
    await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (apiResponse) => {
        const json = await apiResponse.json()
        if (apiResponse.ok) {
          return res.status(200).json(json)
        } else {
          return res.status(500).json(
            json ?? {
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
