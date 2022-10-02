import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../../api/auth/[...nextauth]'
import { useSession } from "next-auth/react"
import axios from 'axios';
import { FINKITA_API_BASE_URL, JWT_SECRET } from '../../../configs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401);
    }
  const { idToken } = await getToken({ req, secret: JWT_SECRET });

  try {
        const finkitaResp = await axios.get(
            // `${FINKITA_API_BASE_URL}/accounts`,
            `http://localhost:8080/api/v1/accounts`,
            {
                headers: {
                    'id-token': idToken as string
                }

            }
        )

        res.status(200).json(finkitaResp.data)
  } catch (err: any) {
        console.log({err})
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
