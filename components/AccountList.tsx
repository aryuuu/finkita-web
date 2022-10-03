import * as React from 'react'
import AccountCard from './AccountCard'
import { Account } from '../interfaces'

type Props = {
  items: Account[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <AccountCard data={item} />
      </li>
    ))}
  </ul>
)

export default List
