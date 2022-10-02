import { NextApiRequest, NextApiResponse } from 'next'
import { sampleAccountData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleAccountData)) {
      throw new Error('Cannot find account data')
    }

    res.status(200).json(sampleAccountData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler

