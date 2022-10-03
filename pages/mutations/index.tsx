import { GetStaticProps } from 'next';

import { Mutation } from '../../interfaces';
import { sampleMutationData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import MutationList from '../../components/MutationList';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FINKITA_API_BASE_URL } from '../../configs';

type Props = {
  items: Mutation[];
};

const WithStaticProps = ({ items }: Props) => {
    const { data: session } = useSession();
    const [mutations, setMutations] = useState([]);

    useEffect(() => {
        if (session) {
            axios.get(
                `${FINKITA_API_BASE_URL}/mutations`,
                {
                    headers: {
                        'id-token': session.idToken as string
                    }
                }
            )
            .then(res => {
                console.log({data: res.data})
                setMutations(res.data);
            })
            .catch(err => console.log(err))
        }
    }, []);

  return (
    <Layout title='Mutations | Finkita'>
      <h1>Mutations List</h1>
      <p>
        Example fetching data from inside <code>getStaticProps()</code>.
      </p>
      <p>You are currently on: /mutations</p>
      <MutationList items={mutations} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: Mutation[] = sampleMutationData;
  return { props: { items } };
};

export default WithStaticProps;
