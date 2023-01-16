import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { schema, SearchFormInputs } from "./schema";
import { SearchFormContainer } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import { Loading } from "../../../../components/Loading";
import { useTransactions } from "../../../../hooks/useTransactions";

export function SearchForm() {
  const { fetchTransactions } = useTransactions()

  const { register, handleSubmit, formState } = useForm<SearchFormInputs>({
    resolver: zodResolver(schema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={formState.isSubmitting}>
        { formState.isSubmitting ? (
          <>
            <Loading size={20} />
            Buscar
          </>
        ) : (
          <>
            <MagnifyingGlass size={20} />
            Buscar
          </>
        )}
      </button>
    </SearchFormContainer>
  )
}
