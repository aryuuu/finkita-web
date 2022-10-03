import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';

import { Account } from '../../interfaces';
import { sampleAccountData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import List from '../../components/AccountList';
import { FINKITA_API_BASE_URL } from '../../configs';
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';

type Props = {
  items: Account[];
};

const WithStaticProps = ({ items }: Props) => {
  const { data: session } = useSession();
  const [accounts, setAccounts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bank, setBank] = useState('');
    const [password, setPassword] = useState('');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChangeUserId = (value: string) => {
        setUserId(value)
    }

    const handleChangeAccountNumber = (value: string) => {
        setAccountNumber(value)
    }

    const handleChangeBank = (value: string) => {
        setBank(value)
    }

    const handleChangePassword = (value: string) => {
        setPassword(value)
    }

    const handleSubmit = async () => {
        if (!session) {
            return
        }
        try {
            console.log({FINKITA_API_BASE_URL})
            const res = await axios.post(
                `${FINKITA_API_BASE_URL}/accounts`,
                {
                    user_id: userId,
                    bank,
                    password,
                    account_number: accountNumber
                },
                {
                    headers: {
                        'id-token': session.idToken as string
                    }
                }
            );
            console.log(res.data);
        } catch (err) {
            console.log({err});
        }

    }

    useEffect(() => {
    if (session) {
            console.log({FINKITA_API_BASE_URL})
      console.log({ idToken: session.idToken });
      axios
        .get(`${FINKITA_API_BASE_URL}/accounts`, {
          headers: {
            'id-token': session.idToken as string,
          },
        })
        .then((res) => {
          console.log({ data: res.data });
          setAccounts(res.data);
        })
        .catch((err) => console.log({ err }));
    }
  }, []);

  return (
    <Layout title='Account | Finkita'>
    <div>
      <Button onClick={handleOpen}>
        <AddCircleIcon/>
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
            sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        > 
            <TextField
              className=""
              name="userid"
              variant="outlined"
              required
              id="userid"
              label="user ID"
              autoFocus
              value={userId}
              onChange={(e) => handleChangeUserId(e.target.value)}
              style={{ color: 'white' }}
            />
            <TextField
              className=""
              name="bank"
              variant="outlined"
              required
              id="bank"
              label="bank"
              autoFocus
              value={bank}
              onChange={(e) => handleChangeBank(e.target.value)}
              style={{ color: 'white' }}
            />
            <TextField
              className=""
              name="accountnumber"
              variant="outlined"
              required
              id="accountnumber"
              label="account number"
              autoFocus
              value={accountNumber}
              onChange={(e) => handleChangeAccountNumber(e.target.value)}
              style={{ color: 'white' }}
            />
            <TextField
              className=""
              name="password"
              variant="outlined"
              required
              id="password"
              label="password"
              autoFocus
              value={password}
              type="password"
              onChange={(e) => handleChangePassword(e.target.value)}
              style={{ color: 'white' }}
            />
            <Button onClick={handleSubmit}>
               Submit 
            </Button>
        </Box>
      </Modal>
    </div>
    {/*asfasfasfasdfs*/}
      <h1>Accounts List</h1>
      <p>You are currently on: /accounts</p>
      <List items={accounts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: Account[] = sampleAccountData;
  return { props: { items } };
};

export default WithStaticProps;
