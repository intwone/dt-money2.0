import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { useTransactions } from '../../hooks/useTransactions'
import { dataFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions } = useTransactions()

  const transactionsFormatted = transactions.map((transaction) => ({
    ...transaction,
    createdAt: dataFormatter.format(new Date(transaction.createdAt)),
    price: priceFormatter.format(transaction.price),
  }))

  return (
    <div>
      <Header />

      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactionsFormatted.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td width="50%">
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {transaction.price}
                  </PriceHighlight>
                </td>
                <td width="50%">{transaction.type}</td>
                <td width="50%">{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
