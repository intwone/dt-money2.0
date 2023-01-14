import { useContext } from "react";
import { TransactionsContext, TransactionsContextType } from "../contexts/TransactionsContext";

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error('useTransactions must be used within an TransactionsProvider');
  return context;
};