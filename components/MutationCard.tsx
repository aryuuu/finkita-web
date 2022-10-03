import React from 'react'
import Link from 'next/link'

import { Mutation } from '../interfaces'

type Props = {
  data: Mutation
}

const MutationCard = ({ data }: Props) => (
  <Link href="/mutations/[id]" as={`/mutations/${data.id}`}>
    <a>
      {data.id}: {data.email}<br/>
      {data.description}
    </a>
  </Link>
)

export default MutationCard

