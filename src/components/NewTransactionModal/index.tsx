import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useTransactions } from '../../hooks/useTransactions'
import { createNewTransaction } from '../../services/transactions'
import { Loading } from '../Loading'
import { NewTransactionFormInputs, schema } from './schema'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

export function NewTransactionModal() {
  const { updateTransactions } = useTransactions()
  const { register, handleSubmit, formState, control, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(schema),
      defaultValues: {
        type: 'income',
      },
    })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const transaction = await createNewTransaction(data)
    updateTransactions(transaction)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <Loading size={20} color="#fff" />
            ) : (
              'Cadastrar'
            )}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
