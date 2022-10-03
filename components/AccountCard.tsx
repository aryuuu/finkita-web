import React from 'react'
import Link from 'next/link'

import { Account } from '../interfaces'

type Props = {
  data: Account
}

const AccountCard = ({ data }: Props) => (
  <Link href="/accounts/[id]" as={`/accounts/${data.id}`}>
    <a>
      {data.id}: {data.email}
    </a>
  </Link>
)

export default AccountCard
