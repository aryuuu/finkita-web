import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next'
import { useSession } from "next-auth/react"

import { Account } from '../../interfaces'
import { sampleAccountData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'
import axios from 'axios'

type Props = {
  items: Account[]
}

const WithStaticProps = ({ items }: Props) => {
    const { data: session } = useSession();
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        if (session) {
            axios.get(
                `/api/accounts`,
                {
                    headers: {
                        'id-token': session.idToken as string
                    }
                }
            )
            .then(res => {
                    console.log({data: res.data})
                    setAccounts(res.data)

                })
            .catch(err => console.log({err}))
        }
    }, [])

    return (
      <Layout title="Account | Finkita">
        <h1>Accounts List</h1>
        <p>You are currently on: /accounts</p>
        <List items={accounts} />
      </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: Account[] = sampleAccountData
  return { props: { items } }
}

export default WithStaticProps

