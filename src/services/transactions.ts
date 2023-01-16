import { api } from "../lib/axios";

interface Transaction {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

export async function filterTransactionsList(query?: string) {
  const response = await api.get('transactions', {
    params: {
      _sort: 'createdAt',
      _order: 'desc',
      q: query
    }
  })
  return response
}

export async function createNewTransaction(data: Transaction) {
  const { description, price, category, type } = data 
  const transaction = await api.post('transactions', {
    description, 
    price, 
    category, 
    type,
    createdAt: new Date()
  })
  return transaction.data
}