import { Account, User } from '../interfaces'

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
