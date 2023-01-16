import { useContextSelector } from 'use-context-selector'
import {
  TransactionsContext,
  TransactionsContextType,
} from '../contexts/TransactionsContext'

export function useTransactions(): TransactionsContextType {
  const context = useContextSelector(TransactionsContext, (context) => {
    return context
  })
  return context
}
