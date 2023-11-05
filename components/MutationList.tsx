import * as React from 'react'
import MutationCard from './MutationCard'
import { Mutation } from '../interfaces'

type Props = {
    items: Mutation[]
}

const MutationList = ({ items }: Props) => (
    <ul>
        {items.map((item) => (
            <li key={item.id}>
                <MutationCard data={item} />
            </li>
        ))}
    </ul>
)

export default MutationList

