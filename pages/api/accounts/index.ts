import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../../api/auth/[...nextauth]';
import axios from 'axios';
import { FINKITA_API_BASE_URL, JWT_SECRET } from '../../../configs';

const handleGetAccount = async (req: NextApiRequest, res: NextApiResponse) => {
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
          'id-token': idToken as string,
        },
      },
    );

    res.status(200).json(finkitaResp.data);
  } catch (err: any) {
    console.log({ err });
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

const handlePostAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401);
  }
  const { idToken } = await getToken({ req, secret: JWT_SECRET });

  try {
    const finkitaResp = await axios.post(
      // `${FINKITA_API_BASE_URL}/accounts`,
      `http://localhost:8080/api/v1/accounts`,
        {
           ...req.body,
        },
      {
        headers: {
          'id-token': idToken as string,
        },
      },
    );

    res.status(200).json(finkitaResp.data);
  } catch (err: any) {
    console.log({ err });
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
           handleGetAccount(req, res);
            break;
        case 'POST':
           handlePostAccount(req, res);
            break;
        default:
            break;
    }
  // const session = await unstable_getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401);
  // }
  // const { idToken } = await getToken({ req, secret: JWT_SECRET });

  // try {
  //   const finkitaResp = await axios.get(
  //     // `${FINKITA_API_BASE_URL}/accounts`,
  //     `http://localhost:8080/api/v1/accounts`,
  //     {
  //       headers: {
  //         'id-token': idToken as string,
  //       },
  //     },
  //   );

  //   res.status(200).json(finkitaResp.data);
  // } catch (err: any) {
  //   console.log({ err });
  //   res.status(500).json({ statusCode: 500, message: err.message });
  // }
};


export default handler;
