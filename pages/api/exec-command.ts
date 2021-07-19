import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../lib/connect'

export default async function execCommand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const token = process.env.API_TOKEN
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: `Use POST method`,
    })
  }
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  if (!req.body) {
    return res.status(500).json({
      message: 'Please specify body',
    })
  }

  const command = JSON.parse(req.body).command
  if (!command || typeof command !== 'string') {
    return res.status(500).json({
      message: 'Please specify command',
    })
  }

  try {
    await connect().then(async (server) => {
      if (server) {
        return server.execCommand(command).then((result) => {
          if (result.stderr) {
            console.error(`STDERR detected: ${result.stderr}`)
            return res.status(500).json({
              message: `${result.stderr}`,
            })
          } else {
            if (result.stdout.length > 0) {
              return res.status(200).json({
                message: `${result.stdout}`,
              })
            } else {
              return res.status(200).json({
                message: `(STDOUTがありません)`,
              })
            }
          }
        })
      } else {
        return res.status(500).json({
          message: `ERROR: Connect failed`,
        })
      }
    })
  } catch (e) {
    return res.status(500).json({
      message: `ERROR: ${JSON.stringify(e)}`,
    })
  }
}
