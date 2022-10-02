import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Account } from '../../interfaces'
import { sampleMutationData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'

type Props = {
  items: Account[]
}

const WithStaticProps = ({ items }: Props) => {
    return (
      <Layout title="Mutations | Finkita">
        <h1>Mutations List</h1>
        <p>
          Example fetching data from inside <code>getStaticProps()</code>.
        </p>
        <p>You are currently on: /mutations</p>
        <List items={items} />
      </Layout>
    )
} 

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: Account[] = sampleMutationData
  return { props: { items } }
}

export default WithStaticProps


