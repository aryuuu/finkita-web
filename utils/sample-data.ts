import { Account, Mutation, User } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]

/** Dummy account data. */
export const sampleAccountData: Account[] = [
  { id: 101, email: '', bank: '', user_id: '', account_number: '', name: 'Alice' },
  { id: 102, email: '', bank: '', user_id: '', account_number: '', name: 'Bob' },
  { id: 103, email: '', bank: '', user_id: '', account_number: '', name: 'Caroline' },
  { id: 104, email: '', bank: '', user_id: '', account_number: '', name: 'Dave' },
]

/** Dummy account data. */
export const sampleMutationData: Mutation[] = [
    { id: 101, account_id: '', type: 'credit', amount: 100, email: '', date: '', bank: 'BNI', account_number: '1', balance: 1337, currency: 'IDR', description: 'twitch donation'},
    { id: 102, account_id: '', type: 'credit', amount: 100, email: '', date: '', bank: 'BNI', account_number: '1', balance: 1337, currency: 'IDR', description: 'twitch donation'},
    { id: 103, account_id: '', type: 'credit', amount: 100, email: '', date: '', bank: 'BNI', account_number: '1', balance: 1337, currency: 'IDR', description: 'twitch donation'},
    { id: 104, account_id: '', type: 'credit', amount: 100, email: '', date: '', bank: 'BNI', account_number: '1', balance: 1337, currency: 'IDR', description: 'twitch donation'},
    { id: 105, account_id: '', type: 'credit', amount: 100, email: '', date: '', bank: 'BNI', account_number: '1', balance: 1337, currency: 'IDR', description: 'twitch donation'},
]
