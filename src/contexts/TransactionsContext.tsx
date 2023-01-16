import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { filterTransactionsList } from '../services/transactions'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

export interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  updateTransactions: (transaction: Transaction) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await filterTransactionsList(query)
    setTransactions(response.data)
  }

  function updateTransactions(transaction: Transaction) {
    setTransactions((state) => [...state, transaction])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, updateTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
