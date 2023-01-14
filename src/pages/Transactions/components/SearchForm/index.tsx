import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { schema, SearchFormInputs } from "./schema";
import { SearchFormContainer } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import BounceLoader from "react-spinners/BounceLoader";

export function SearchForm() {
  const { register, handleSubmit, formState } = useForm<SearchFormInputs>({
    resolver: zodResolver(schema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
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
          <BounceLoader size={20} color="#00875F"/>
        ) : (
          <MagnifyingGlass size={20} />
        )}
      </button>
    </SearchFormContainer>
  )
}
