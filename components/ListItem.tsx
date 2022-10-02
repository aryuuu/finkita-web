import React from 'react'
import Link from 'next/link'

import { Account, User } from '../interfaces'

type Props = {
  data: Account
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.email}
    </a>
  </Link>
)

export default ListItem
