// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type Account = {
  id: number
    email: string
    bank: string
    user_id: string
    account_number: string
  name: string
}

export type Mutation = {
  id: number
    account_id: string
    type: string
    amount: number
    email: string
    date: string
    bank: string
    account_number: string
    balance: number
    currency: string
    description: string
}
